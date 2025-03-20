import http from "http";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, Turbo Server with TypeScript!");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
