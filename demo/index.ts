import http from "node:http";
import { listenOnce } from "../src/index.js";

const PORT = 3000;
const HOSTNAME = "localhost";

function onListening() {
  console.log("Server listening on", `http://${HOSTNAME}:${PORT}`);
}

function onRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  console.log("Incoming request", req.url);

  res.statusCode = 200;
  res.end();
}

await listenOnce(PORT, HOSTNAME, onListening, onRequest);

console.log("Server closed");
