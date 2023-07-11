import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";

const numCPUs = availableParallelism();
console.log(`${numCPUs} processes available`);

async function runApp() {
  await import("./app");
}

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `worker ${worker.process.pid} died. \n Scheduling another one!`
      );
    }
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

  runApp();
}
