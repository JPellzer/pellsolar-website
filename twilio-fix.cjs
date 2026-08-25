const https = require('https');

const accountSid = 'ACc7958dad4921d32aa226f21267c12f66';
const apiKeySid = 'SK8fc3d61294137bb38d7b99ea39ac9c3a';
const apiKeySecret = 'ALMTJLoFokCusSGFi1UCjcmWtMyTHyI5';
const auth = Buffer.from(`${apiKeySid}:${apiKeySecret}`).toString('base64');

// Phone number SID for +19095528096 - need to look this up
// Verified Mixed service
const VERIFIED_SERVICE = 'MG75c2ee901445181dd0e01fa6023ed8a9';
// Failed Account Notification service
const FAILED_SERVICE = 'MG8042bab039d3dec08429976284d40bd4';

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
  // Step 1: Get the phone number SID for +19095528096
  console.log('Step 1: Finding phone number SID for +19095528096...');
  const r1 = await httpRequest('GET', 'api.twilio.com',
    `/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers.json?PhoneNumber=%2B19095528096`);
  
  if (r1.status !== 200) {
    console.error('Failed to get phone numbers:', r1.status, r1.body);
    return;
  }
  
  const nums = r1.body.incoming_phone_numbers || [];
  if (nums.length === 0) {
    console.error('Phone number +19095528096 not found on account');
    return;
  }
  
  const phoneSid = nums[0].sid;
  console.log(`Found: ${nums[0].phone_number} SID: ${phoneSid}`);

  // Step 2: Remove from failed service
  console.log(`\nStep 2: Removing ${phoneSid} from failed service ${FAILED_SERVICE}...`);
  const r2 = await httpRequest('DELETE', 'messaging.twilio.com',
    `/v1/Services/${FAILED_SERVICE}/PhoneNumbers/${phoneSid}`);
  console.log('Remove result:', r2.status, JSON.stringify(r2.body).substring(0, 200));

  // Step 3: Add to verified Mixed service
  console.log(`\nStep 3: Adding ${phoneSid} to verified Mixed service ${VERIFIED_SERVICE}...`);
  const r3 = await httpRequest('POST', 'messaging.twilio.com',
    `/v1/Services/${VERIFIED_SERVICE}/PhoneNumbers`,
    { PhoneNumberSid: phoneSid });
  console.log('Add result:', r3.status, JSON.stringify(r3.body).substring(0, 300));

  if (r3.status === 201 || r3.status === 200) {
    console.log('\n✅ SUCCESS! +19095528096 is now in the verified Mixed messaging service.');
    console.log('Both phone numbers (714-455-3401 and 909-552-8096) can now send messages.');
  } else {
    console.log('\n❌ Failed to add to verified service. See error above.');
  }

  // Step 4: Verify final state
  console.log('\nStep 4: Verifying final state...');
  const r4 = await httpRequest('GET', 'messaging.twilio.com',
    `/v1/Services/${VERIFIED_SERVICE}/PhoneNumbers`);
  if (r4.status === 200) {
    const finalNums = r4.body.phone_numbers || [];
    console.log('Phone numbers in verified Mixed service:', finalNums.map(n => n.phone_number || n.sid).join(', '));
  }
}

main().catch(console.error);
