const http = require('http');
function check(path, expectedStatus) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + path, (res) => {
      console.log(path, res.statusCode, res.statusCode === expectedStatus ? 'PASS' : 'FAIL');
      resolve();
    }).on('error', (e) => {
      console.log(path, 'ERROR', e.message);
      resolve();
    });
  });
}
async function run() {
  await check('/api/certificate/verify', 400);
  await check('/api/certificate/verify?tokenUri=invalid', 404);
}
run();
