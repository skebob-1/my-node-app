const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Node.js проект</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    background: linear-gradient(to right, #ff512f, #dd2476);
                    font-family: 'Arial', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                h1 {
                    color: white;
                    font-size: 3.5em;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }
            </style>
        </head>
        <body>
            <h1>Я изучаю NODE.JS в JAVASCRIPT!</h1>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
