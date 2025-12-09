const http = require('http');
function check(method, path, body, expectedStatus) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
         console.log(method, path, res.statusCode, res.statusCode === expectedStatus ? 'PASS' : 'FAIL', data.substring(0, 100));
         resolve();
      });
    });
    req.on('error', (e) => {
      console.log(path, 'ERROR', e.message);
      resolve();
    });
    if(body) req.write(JSON.stringify(body));
    req.end();
  });
}
async function run() {
  await check('POST', '/api/certificate/verify', { tokenUri: 'invalid' }, 404);
  await check('POST', '/api/certificate/verify', { tokenUri: '' }, 400);
}
run();
