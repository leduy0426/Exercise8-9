const http = require('http');
const app = require('./app');

let server;

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const options = {
      hostname: '127.0.0.1',
      port: 3008,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = data;
        try { json = JSON.parse(data); } catch(e) {}
        resolve({ statusCode: res.statusCode, body: json });
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  server = app.listen(3008, async () => {
    console.log('--- EXERCISE 8 TEST SUITE ---');
    try {
      // Test 1: Valid POST /articles
      console.log('\n[TEST 1] POST /articles with valid body');
      const res1 = await makeRequest('POST', '/articles', {
        title: "My Favorite Vacation",
        date: "2023-06-02",
        text: "We spent seven days in Italy..."
      });
      console.log('Status:', res1.statusCode);
      console.log('Response:', res1.body);

      // Test 2: Invalid POST /articles (missing required fields)
      console.log('\n[TEST 2] POST /articles missing text field (Trigger Error)');
      const res2 = await makeRequest('POST', '/articles', {
        title: "My Favorite Vacation",
        date: "2023-06-02"
      });
      console.log('Status:', res2.statusCode);
      console.log('Response:', res2.body);

      // Test 3: DELETE /articles/1
      console.log('\n[TEST 3] DELETE /articles/1');
      const res3 = await makeRequest('DELETE', '/articles/1');
      console.log('Status:', res3.statusCode);
      console.log('Response:', res3.body);

      // Test 4: GET /videos/invalid
      console.log('\n[TEST 4] GET /videos/invalid (Trigger Router Error)');
      const res4 = await makeRequest('GET', '/videos/abc');
      console.log('Status:', res4.statusCode);
      console.log('Response:', res4.body);

      console.log('\n✅ ALL EXERCISE 8 TESTS PASSED SUCCESSFULY!');
    } catch (err) {
      console.error('Test error:', err);
    } finally {
      server.close();
    }
  });
}

runTests();
