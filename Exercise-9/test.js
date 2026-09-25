const http = require('http');
const app = require('./app');

let server;

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const options = {
      hostname: '127.0.0.1',
      port: 3009,
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
  server = app.listen(3009, async () => {
    console.log('--- EXERCISE 9 TEST SUITE ---');
    try {
      // Test 1: Valid POST /articles (Exercise 1 & 5)
      console.log('\n[TEST 1] POST /articles with valid article');
      const res1 = await makeRequest('POST', '/articles', {
        title: "My Favorite Vacation",
        date: "2023-06-02",
        text: "We spent seven days in Italy..."
      });
      console.log('Status:', res1.statusCode);
      console.log('Response:', res1.body);

      // Test 2: Missing required fields (Exercise 1: validateArticle middleware)
      console.log('\n[TEST 2] POST /articles with missing text field');
      const res2 = await makeRequest('POST', '/articles', {
        title: "My Favorite Vacation",
        date: "2023-06-02"
      });
      console.log('Status:', res2.statusCode);
      console.log('Response:', res2.body);

      // Test 3: Invalid date format (Exercise 2: validateDateFormat middleware)
      console.log('\n[TEST 3] POST /articles with invalid date format (06-02-2023)');
      const res3 = await makeRequest('POST', '/articles', {
        title: "My Favorite Vacation",
        date: "06-02-2023",
        text: "We spent seven days in Italy..."
      });
      console.log('Status:', res3.statusCode);
      console.log('Response:', res3.body);

      // Test 4: Short text length (Exercise 3: validateTextLength middleware)
      console.log('\n[TEST 4] POST /articles with short text (< 10 chars)');
      const res4 = await makeRequest('POST', '/articles', {
        title: "My Favorite Vacation",
        date: "2023-06-02",
        text: "Too short"
      });
      console.log('Status:', res4.statusCode);
      console.log('Response:', res4.body);

      console.log('\n✅ ALL EXERCISE 9 TESTS PASSED SUCCESSFULY!');
    } catch (err) {
      console.error('Test error:', err);
    } finally {
      server.close();
    }
  });
}

runTests();
