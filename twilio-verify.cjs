const https = require('https');

const accountSid = 'ACc7958dad4921d32aa226f21267c12f66';
const apiKeySid = 'SK8fc3d61294137bb38d7b99ea39ac9c3a';
const apiKeySecret = 'ALMTJLoFokCusSGFi1UCjcmWtMyTHyI5';
const auth = Buffer.from(`${apiKeySid}:${apiKeySecret}`).toString('base64');

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
  // 1. Check current webhook config on 909-552-8096
  console.log('=== Checking webhook config for +19095528096 ===');
  const phoneSid = 'PN0321144abcd046bdb47f4d82fda343b9';
  const phoneRes = await httpRequest('GET', 'api.twilio.com',
    `/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers/${phoneSid}.json`
  );
  if (phoneRes.status === 200) {
    const p = phoneRes.body;
    console.log(`Phone: ${p.phone_number}`);
    console.log(`SmsUrl: ${p.sms_url}`);
    console.log(`SmsMethod: ${p.sms_method}`);
    console.log(`SmsFallbackUrl: ${p.sms_fallback_url}`);
    console.log(`StatusCallback: ${p.status_callback}`);
  } else {
    console.log('Failed to get phone config:', JSON.stringify(phoneRes.body));
    // Try listing all numbers to find the right SID
    console.log('\nListing all phone numbers...');
    const listRes = await httpRequest('GET', 'api.twilio.com',
      `/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers.json?PhoneNumber=%2B19095528096`
    );
    if (listRes.status === 200 && listRes.body.incoming_phone_numbers) {
      listRes.body.incoming_phone_numbers.forEach(p => {
        console.log(`SID: ${p.sid}`);
        console.log(`Phone: ${p.phone_number}`);
        console.log(`SmsUrl: ${p.sms_url}`);
        console.log(`SmsMethod: ${p.sms_method}`);
      });
    }
  }

  // 2. Check recent Twilio error logs
  console.log('\n=== Recent Twilio Alerts/Errors ===');
  const alertsRes = await httpRequest('GET', 'monitor.twilio.com',
    `/v1/Alerts?PageSize=20`
  );
  if (alertsRes.status === 200 && alertsRes.body.alerts) {
    if (alertsRes.body.alerts.length === 0) {
      console.log('No recent alerts found.');
    } else {
      alertsRes.body.alerts.forEach(a => {
        console.log(`[${a.date_created}] ${a.alert_text} | Error: ${a.error_code} | URL: ${a.request_url}`);
      });
    }
  } else {
    console.log('Alerts response:', alertsRes.status, JSON.stringify(alertsRes.body).substring(0, 300));
  }

  // 3. Check recent inbound messages to 909-552-8096
  console.log('\n=== Recent Inbound Messages to +19095528096 ===');
  const msgsRes = await httpRequest('GET', 'api.twilio.com',
    `/2010-04-01/Accounts/${accountSid}/Messages.json?To=%2B19095528096&PageSize=10`
  );
  if (msgsRes.status === 200 && msgsRes.body.messages) {
    if (msgsRes.body.messages.length === 0) {
      console.log('No inbound messages found to this number.');
    } else {
      msgsRes.body.messages.forEach(m => {
        console.log(`[${m.date_created}] FROM: ${m.from} | STATUS: ${m.status} | BODY: ${m.body}`);
      });
    }
  } else {
    console.log('Messages response:', msgsRes.status, JSON.stringify(msgsRes.body).substring(0, 300));
  }
}

main().catch(console.error);
