const https = require('https');

const accountSid = 'ACc7958dad4921d32aa226f21267c12f66';
const apiKeySid = 'SK8fc3d61294137bb38d7b99ea39ac9c3a';
const apiKeySecret = 'ALMTJLoFokCusSGFi1UCjcmWtMyTHyI5';
const auth = Buffer.from(`${apiKeySid}:${apiKeySecret}`).toString('base64');
const messagingServiceSid = 'MG75c2ee901445181dd0e01fa6023ed8a9';

function httpRequest(method, hostname, path, body) {
  return new Promise((resolve) => {
    const postData = body ? new URLSearchParams(body).toString() : null;
    const options = {
      hostname, path, method,
      headers: {
        'Authorization': `Basic ${auth}`,
        ...(postData ? {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        } : {})
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', e => resolve({ status: 0, error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ status: 0, error: 'TIMEOUT' }); });
    if (postData) req.write(postData);
    req.end();
  });
}

async function main() {
  // 1. Check current messaging service config
  console.log('=== Current Messaging Service Config ===');
  const getRes = await httpRequest('GET', 'messaging.twilio.com',
    `/v1/Services/${messagingServiceSid}`
  );
  if (getRes.status === 200) {
    const s = getRes.body;
    console.log(`Friendly Name: ${s.friendly_name}`);
    console.log(`Inbound Request URL: ${s.inbound_request_url}`);
    console.log(`Inbound Method: ${s.inbound_method}`);
    console.log(`Fallback URL: ${s.fallback_url}`);
    console.log(`Status Callback: ${s.status_callback}`);
    console.log(`Use Inbound Webhook on Number: ${s.use_inbound_webhook_on_number}`);
  } else {
    console.log('Failed to get service:', getRes.status, JSON.stringify(getRes.body).substring(0, 300));
    return;
  }

  // 2. Update messaging service:
  //    - Set inbound webhook to the CRM endpoint
  //    - Enable use_inbound_webhook_on_number so phone-level webhook takes priority
  console.log('\n=== Updating Messaging Service ===');
  const updateRes = await httpRequest('POST', 'messaging.twilio.com',
    `/v1/Services/${messagingServiceSid}`,
    {
      InboundRequestUrl: 'https://app.pellsolar.com/api/webhooks/twilio',
      InboundMethod: 'POST',
      UseInboundWebhookOnNumber: 'true',  // phone-level webhook takes priority
    }
  );
  if (updateRes.status === 200) {
    const s = updateRes.body;
    console.log('✅ Updated successfully!');
    console.log(`Inbound Request URL: ${s.inbound_request_url}`);
    console.log(`Inbound Method: ${s.inbound_method}`);
    console.log(`Use Inbound Webhook on Number: ${s.use_inbound_webhook_on_number}`);
  } else {
    console.log('❌ Update failed:', getRes.status, JSON.stringify(updateRes.body).substring(0, 300));
  }
}

main().catch(console.error);
