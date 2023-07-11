import http from 'node:http';
import { env } from 'node:process';

const app = http
const PORT = env.PORT || 3000;
console.log(`Using port: ${PORT}`);

app.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
  console.log(`Request on worker ID: ${process.pid}`);
}).listen(PORT);

console.log(`Worker ${process.pid} started`);

export default app;
