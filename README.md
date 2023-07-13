# listen-once

A Node.js web server that listen only once

## Purpose

This library expose a simple method that spins a web server that accept only one request. It can be used to retrieve a query string parameter or body from a authorization redirect (OAuth 2 for example).

# ECMAScript module

This library is published as an ECMAScript module.

## Usage

```typescript
import http from "node:http";
import { listenOnce } from "@fvilers/listen-once";

const PORT = 3000;
const HOSTNAME = "localhost";

function onListening() {
  console.log("Server listening on", `http://${HOSTNAME}:${PORT}`);
}

function onRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  console.log("Incoming request", req.url);

  // TODO: do something with the request

  res.statusCode = 200;
  res.end();
}

await listenOnce(PORT, HOSTNAME, onListening, onRequest);

console.log("Server closed");
```
