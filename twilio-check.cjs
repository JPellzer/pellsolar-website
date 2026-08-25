const https = require('https');

const accountSid = 'ACc7958dad4921d32aa226f21267c12f66';
const apiKeySid = 'SK8fc3d61294137bb38d7b99ea39ac9c3a';
const apiKeySecret = 'ALMTJLoFokCusSGFi1UCjcmWtMyTHyI5';
const auth = Buffer.from(`${apiKeySid}:${apiKeySecret}`).toString('base64');

function httpGet(hostname, path) {
  return new Promise((resolve) => {
    const req = https.get({
      hostname, path,
      headers: { 'Authorization': `Basic ${auth}` }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', e => resolve({ status: 0, error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ status: 0, error: 'TIMEOUT' }); });
  });
}

async function main() {
  // Get recent failed/undelivered messages
  console.log('=== Recent FAILED messages (last 50) ===');
  const r = await httpGet('api.twilio.com',
    `/2010-04-01/Accounts/${accountSid}/Messages.json?Status=failed&PageSize=20`);
  if (r.status === 200) {
    const msgs = r.body.messages || [];
    if (msgs.length === 0) {
      console.log('No failed messages found.');
    }
    for (const m of msgs) {
      console.log(`[${m.date_sent}] TO: ${m.to} FROM: ${m.from}`);
      console.log(`  Status: ${m.status} | Error: ${m.error_code} - ${m.error_message}`);
      console.log(`  Body: ${m.body.substring(0, 100)}`);
      console.log(`  Service: ${m.messaging_service_sid}`);
      console.log('');
    }
  } else {
    console.log('Error:', r.status, r.body);
  }

  // Get recent undelivered messages
  console.log('\n=== Recent UNDELIVERED messages (last 20) ===');
  const r2 = await httpGet('api.twilio.com',
    `/2010-04-01/Accounts/${accountSid}/Messages.json?Status=undelivered&PageSize=20`);
  if (r2.status === 200) {
    const msgs = r2.body.messages || [];
    if (msgs.length === 0) {
      console.log('No undelivered messages found.');
    }
    for (const m of msgs) {
      console.log(`[${m.date_sent}] TO: ${m.to} FROM: ${m.from}`);
      console.log(`  Status: ${m.status} | Error: ${m.error_code} - ${m.error_message}`);
      console.log(`  Body: ${m.body.substring(0, 100)}`);
      console.log(`  Service: ${m.messaging_service_sid}`);
      console.log('');
    }
  }

  // Check which phone numbers are in each messaging service
  console.log('\n=== Phone numbers in MG75c2ee (verified Mixed) ===');
  const r3 = await httpGet('messaging.twilio.com',
    '/v1/Services/MG75c2ee901445181dd0e01fa6023ed8a9/PhoneNumbers');
  if (r3.status === 200) {
    const nums = r3.body.phone_numbers || [];
    console.log('Phone numbers:', nums.map(n => n.phone_number || n.sid).join(', ') || 'none');
  }

  console.log('\n=== Phone numbers in MG8042ba (failed Account Notification) ===');
  const r4 = await httpGet('messaging.twilio.com',
    '/v1/Services/MG8042bab039d3dec08429976284d40bd4/PhoneNumbers');
  if (r4.status === 200) {
    const nums = r4.body.phone_numbers || [];
    console.log('Phone numbers:', nums.map(n => n.phone_number || n.sid).join(', ') || 'none');
  }

  // Check all phone numbers on account
  console.log('\n=== All phone numbers on account ===');
  const r5 = await httpGet('api.twilio.com',
    `/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers.json`);
  if (r5.status === 200) {
    const nums = r5.body.incoming_phone_numbers || [];
    for (const n of nums) {
      console.log(`  ${n.phone_number} - ${n.friendly_name} - SMS: ${n.capabilities?.sms}`);
    }
  }
}

main().catch(console.error);
