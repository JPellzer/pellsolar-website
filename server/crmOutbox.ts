import { randomUUID } from 'crypto';
import { getPool, setLeadCrmInfo } from './db';
import { sendToCrm, type CrmLeadPayload, type CrmLeadResult } from './crmWebhook';
import { storageGetSignedUrl } from './storage';

let schema: Promise<unknown> | undefined;
async function ensureOutbox() {
  const pool = await getPool();
  if (!schema) schema = pool.query(`CREATE TABLE IF NOT EXISTS website_crm_outbox (
    id UUID PRIMARY KEY, lead_id INTEGER, payload JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0,
    next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), lease_until TIMESTAMPTZ,
    lease_token UUID, result JSONB, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), delivered_at TIMESTAMPTZ
  ); CREATE INDEX IF NOT EXISTS website_crm_outbox_due ON website_crm_outbox(next_attempt_at)
    WHERE status = 'pending';`).catch(e => { schema = undefined; throw e; });
  await schema;
  return pool;
}

export async function enqueueCrmLead(payload: CrmLeadPayload, leadId?: number): Promise<string> {
  const pool = await ensureOutbox();
  const id = randomUUID();
  if (payload.service_intake) payload.service_intake.website_delivery_id=id;
  await pool.query('INSERT INTO website_crm_outbox (id, lead_id, payload) VALUES ($1,$2,$3)',
    [id, leadId || null, JSON.stringify(payload)]);
  return id;
}

export async function deliverCrmLead(id: string): Promise<CrmLeadResult> {
  const pool = await ensureOutbox();
  const token = randomUUID();
  const { rows } = await pool.query(`UPDATE website_crm_outbox
    SET lease_token = $2, lease_until = NOW() + INTERVAL '2 minutes', attempts = attempts + 1
    WHERE id = $1 AND status = 'pending' AND next_attempt_at <= NOW()
      AND (lease_until IS NULL OR lease_until < NOW()) RETURNING *`, [id, token]);
  if (!rows.length) {
    const saved = await pool.query('SELECT result, status FROM website_crm_outbox WHERE id = $1', [id]);
    return saved.rows[0]?.status === 'delivered' ? saved.rows[0].result : { success: false, queued: true };
  }
  const row = rows[0];
  const payload: CrmLeadPayload = row.payload;
  let result: CrmLeadResult;
  try {
    // Re-sign files on every attempt; a long outage must not strand expired links.
    if (payload.bill_files?.length) {
      payload.bill_files = await Promise.all(payload.bill_files.map(async f => ({ ...f,
        url: await storageGetSignedUrl(f.key, 7 * 24 * 60 * 60) || f.url })));
      const first = payload.bill_files.find(f => f.type === 'bill');
      if (first) payload.bill_file_url = first.url;
    } else if (payload.bill_file_key) {
      payload.bill_file_url = await storageGetSignedUrl(payload.bill_file_key, 7 * 24 * 60 * 60) || payload.bill_file_url;
    }
    if (payload.service_intake?.photoFiles?.length) {
      payload.service_intake.photoFiles = await Promise.all(payload.service_intake.photoFiles.map(async (f:any)=>({...f,fileUrl:await storageGetSignedUrl(f.fileKey,7*24*60*60)||f.fileUrl})));
    }
    result = await sendToCrm(payload);
  } catch { result = { success: false, error: 'delivery_error' }; }
  const confirmed = result.success === true && Boolean(result.deal_id || (payload.service_intake && result.pending_id));
  const delay = Math.min(21600, 60 * 2 ** Math.min(9, row.attempts - 1));
  await pool.query(`UPDATE website_crm_outbox SET status = $3, result = $4,
    lease_token = NULL, lease_until = NULL, next_attempt_at = NOW() + ($5 * INTERVAL '1 second'),
    delivered_at = CASE WHEN $3 = 'delivered' THEN NOW() ELSE NULL END
    WHERE id = $1 AND lease_token = $2`,
    [id, token, confirmed ? 'delivered' : 'pending', JSON.stringify(result), delay]);
  if (row.lead_id) await setLeadCrmInfo(row.lead_id, {
    crmDealId: result.deal_id, crmCustomerId: result.customer_id,
    crmStatus: confirmed ? 'accepted' : 'pending',
  });
  return { ...result, queued: !confirmed };
}

export async function recoverCrmLeads() {
  const pool = await ensureOutbox();
  const { rows } = await pool.query(`SELECT id FROM website_crm_outbox WHERE status = 'pending'
    AND next_attempt_at <= NOW() AND (lease_until IS NULL OR lease_until < NOW())
    ORDER BY next_attempt_at LIMIT 10`);
  for (const row of rows) await deliverCrmLead(row.id);
}

let started = false;
export function startCrmRecovery() {
  if (started || !process.env.DATABASE_URL || process.env.CRM_DELIVERY_ENABLED === 'false') return;
  started = true;
  let running = false;
  const tick = async () => {
    if (running) return;
    running = true;
    try { await recoverCrmLeads(); } catch { console.error('[CRM] Pending delivery recovery failed'); }
    finally { running = false; }
  };
  const timer = setInterval(tick, 60000);
  timer.unref();
  void tick();
}
