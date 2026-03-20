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
                    background: #000;
                    font-family: 'Courier New', monospace;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                }
                
                .matrix-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                    animation: move 10s linear infinite;
                }
                
                .content {
                    position: relative;
                    z-index: 1;
                    background: rgba(0,0,0,0.8);
                    padding: 3rem 5rem;
                    border: 2px solid #0f0;
                    box-shadow: 0 0 20px #0f0;
                }
                
                h1 {
                    color: #0f0;
                    font-size: 2.5em;
                    text-shadow: 0 0 10px #0f0;
                    margin: 0;
                }
                
                .cursor {
                    display: inline-block;
                    width: 10px;
                    height: 1.2em;
                    background: #0f0;
                    margin-left: 5px;
                    animation: blink 1s infinite;
                }
                
                @keyframes move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            </style>
        </head>
        <body>
            <div class="matrix-bg"></div>
            <div class="content">
                <h1>> я изучаю NODE.JS в JAVASCRIPT<span class="cursor"></span></h1>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
