import http from "node:http";

const SERVICE_UNAVAILABLE = 503;

export function listenOnce(
  port: number,
  hostname: string | undefined,
  onListening: () => void,
  onRequest: (req: http.IncomingMessage, res: http.ServerResponse) => void
) {
  return new Promise((resolve, reject) => {
    const server = http.createServer();

    server.on("listening", onListening);
    server.on("request", requestListener);
    server.on("close", resolve);
    server.on("error", reject);
    server.listen(port, hostname);

    function requestListener(
      req: http.IncomingMessage,
      res: http.ServerResponse
    ) {
      if (server.listening) {
        onRequest(req, res);
        server.close();
        server.closeAllConnections();
        server.closeIdleConnections();
        return;
      }

      res.statusCode = SERVICE_UNAVAILABLE;
      res.end();
    }
  });
}
