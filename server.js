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
                    background: #1a1a2e;
                    font-family: 'Arial', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    perspective: 1000px;
                }
                
                .cube {
                    width: 200px;
                    height: 200px;
                    position: relative;
                    transform-style: preserve-3d;
                    animation: rotate 10s infinite linear;
                }
                
                .face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(102, 126, 234, 0.9);
                    border: 2px solid #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-size: 0.8em;
                    text-align: center;
                    padding: 10px;
                    box-sizing: border-box;
                }
                
                .front { transform: translateZ(100px); }
                .back { transform: rotateY(180deg) translateZ(100px); }
                .right { transform: rotateY(90deg) translateZ(100px); }
                .left { transform: rotateY(-90deg) translateZ(100px); }
                .top { transform: rotateX(90deg) translateZ(100px); }
                .bottom { transform: rotateX(-90deg) translateZ(100px); }
                
                @keyframes rotate {
                    0% { transform: rotateX(0) rotateY(0); }
                    100% { transform: rotateX(360deg) rotateY(360deg); }
                }
                
                .text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 2em;
                    text-shadow: 0 0 20px rgba(102,126,234,0.5);
                }
            </style>
        </head>
        <body>
            <div class="cube">
                <div class="face front">я изучаю</div>
                <div class="face back">NODE.JS</div>
                <div class="face right">в</div>
                <div class="face left">JAVASCRIPT</div>
                <div class="face top">я изучаю</div>
                <div class="face bottom">NODE.JS</div>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
