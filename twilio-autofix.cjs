const https = require('https');
const auth = Buffer.from('SK8fc3d61294137bb38d7b99ea39ac9c3a:ALMTJLoFokCusSGFi1UCjcmWtMyTHyI5').toString('base64');
const accountSid = 'ACc7958dad4921d32aa226f21267c12f66';
const svcSid = 'MG75c2ee901445181dd0e01fa6023ed8a9';

function req(method, hostname, path, body) {
  return new Promise((resolve) => {
    const postData = body ? new URLSearchParams(body).toString() : null;
    const r = https.request({ hostname, path, method, headers: { 'Authorization': 'Basic ' + auth, ...(postData ? { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) } : {}) } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: JSON.parse(data) }); } catch(e) { resolve({ status: res.statusCode, body: data }); } });
    });
    r.setTimeout(15000, () => r.destroy());
    r.on('error', e => resolve({ status: 0, error: e.message }));
    if (postData) r.write(postData);
    r.end();
  });
}

async function main() {
  // 1. Get full messaging service config
  console.log('=== Current messaging service config ===');
  const svc = await req('GET', 'messaging.twilio.com', '/v1/Services/' + svcSid);
  if (svc.status === 200) {
    const s = svc.body;
    console.log('inbound_request_url:', s.inbound_request_url);
    console.log('fallback_url:', s.fallback_url);
    console.log('use_inbound_webhook_on_number:', s.use_inbound_webhook_on_number);
    console.log('All keys:', Object.keys(s).join(', '));
  }

  // 2. Get phone number config for 909-552-8096
  console.log('\n=== Phone number config for +19095528096 ===');
  const phones = await req('GET', 'api.twilio.com', '/2010-04-01/Accounts/' + accountSid + '/IncomingPhoneNumbers.json?PhoneNumber=%2B19095528096');
  if (phones.status === 200 && phones.body.incoming_phone_numbers && phones.body.incoming_phone_numbers.length > 0) {
    const p = phones.body.incoming_phone_numbers[0];
    console.log('SID:', p.sid);
    console.log('SmsUrl:', p.sms_url);
    console.log('SmsMethod:', p.sms_method);
    console.log('SmsFallbackUrl:', p.sms_fallback_url);
    console.log('SmsApplicationSid:', p.sms_application_sid);

    // Clear fallback URL on phone number
    console.log('\n=== Clearing fallback URL on phone number ===');
    const update = await req('POST', 'api.twilio.com', '/2010-04-01/Accounts/' + accountSid + '/IncomingPhoneNumbers/' + p.sid + '.json', {
      SmsUrl: 'https://app.pellsolar.com/api/webhooks/twilio',
      SmsMethod: 'POST',
      SmsFallbackUrl: '',
      SmsApplicationSid: ''
    });
    console.log('Update status:', update.status);
    if (update.status === 200) {
      console.log('SmsUrl:', update.body.sms_url);
      console.log('SmsFallbackUrl:', update.body.sms_fallback_url);
      console.log('SmsApplicationSid:', update.body.sms_application_sid);
    } else {
      console.log('Error:', JSON.stringify(update.body).substring(0, 300));
    }
  }

  // 3. Update messaging service to clear fallback URL and set UseInboundWebhookOnNumber=true
  console.log('\n=== Updating messaging service ===');
  const svcUpdate = await req('POST', 'messaging.twilio.com', '/v1/Services/' + svcSid, {
    FallbackUrl: '',
    FallbackMethod: 'POST',
    UseInboundWebhookOnNumber: 'true'
  });
  console.log('Service update status:', svcUpdate.status);
  if (svcUpdate.status === 200) {
    console.log('fallback_url after update:', svcUpdate.body.fallback_url);
    console.log('use_inbound_webhook_on_number:', svcUpdate.body.use_inbound_webhook_on_number);
  } else {
    console.log('Error:', JSON.stringify(svcUpdate.body).substring(0, 300));
  }
}
main().catch(console.error);
