/**
 * server.js
 *
 * @author nissen
 * @version 2020.08.09
 * @description
 */
const http =  require('http');

http.createServer((request, response) => {
  let body = [];
  console.log('headers:');
  console.dir(request.headers);

  console.log('\nmethod:');
  console.dir(request.method);
  debugger;
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    console.log(chunk.toString());
    body.push(chunk);
  }).on('end', () =>{
    body = Buffer.concat(body).toString();
    console.log("body: ", body);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(' hello World\n');
  });
}).listen(8088);