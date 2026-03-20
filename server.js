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
                    background: #0a0a0a;
                    font-family: 'Courier New', monospace;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }
                
                .container {
                    text-align: center;
                    animation: glitch 1s infinite;
                }
                
                h1 {
                    font-size: 4em;
                    color: #0ff;
                    text-shadow: 
                        -2px -2px 0 #f0f,
                        2px 2px 0 #ff0;
                    letter-spacing: 5px;
                }
                
                .subtitle {
                    color: #fff;
                    font-size: 1.2em;
                    border-right: 2px solid #0ff;
                    animation: blink 1s infinite;
                }
                
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
                
                @keyframes blink {
                    0%, 100% { border-color: transparent; }
                    50% { border-color: #0ff; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Я ИЗУЧАЮ NODE.JS</h1>
                <div class="subtitle">в JAVASCRIPT</div>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
