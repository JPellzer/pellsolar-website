const https = require('https');

const accountSid = 'ACc7958dad4921d32aa226f21267c12f66';
const apiKeySid = 'SK8fc3d61294137bb38d7b99ea39ac9c3a';
const apiKeySecret = 'ALMTJLoFokCusSGFi1UCjcmWtMyTHyI5';
const auth = Buffer.from(`${apiKeySid}:${apiKeySecret}`).toString('base64');

// Phone number SID for +19095528096
const phoneSid = 'PN0321144abcd046bdb47f4d82fda343b9';
const webhookUrl = 'https://app.pellsolar.com/api/webhooks/twilio';

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
  console.log('Setting inbound SMS webhook for +19095528096...');
  console.log(`Webhook URL: ${webhookUrl}`);

  const r = await httpRequest('POST', 'api.twilio.com',
    `/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers/${phoneSid}.json`,
    {
      SmsUrl: webhookUrl,
      SmsMethod: 'POST',
    }
  );

  console.log('Status:', r.status);
  if (r.status === 200) {
    console.log('✅ SUCCESS! Webhook set.');
    console.log(`  Phone: ${r.body.phone_number}`);
    console.log(`  SmsUrl: ${r.body.sms_url}`);
    console.log(`  SmsMethod: ${r.body.sms_method}`);
  } else {
    console.log('❌ Failed:', JSON.stringify(r.body, null, 2));
  }
}

main().catch(console.error);
