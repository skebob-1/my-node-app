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
                    background: #f5f5f5;
                    font-family: 'Segoe UI', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .card {
                    background: white;
                    padding: 3rem 5rem;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    text-align: center;
                    animation: slideUp 0.5s ease;
                }
                
                h1 {
                    font-size: 2.5em;
                    color: #333;
                    margin: 0;
                }
                
                .dot {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background: #667eea;
                    border-radius: 50%;
                    margin: 0 5px;
                    animation: bounce 1s infinite;
                }
                
                .dots {
                    margin-top: 20px;
                }
                
                .dot:nth-child(2) { animation-delay: 0.2s; }
                .dot:nth-child(3) { animation-delay: 0.4s; }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>я изучаю NODE.JS в JAVASCRIPT</h1>
                <div class="dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
