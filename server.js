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
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: 'Arial', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .container {
                    text-align: center;
                }
                
                h1 {
                    color: white;
                    font-size: 3.5em;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    margin: 0;
                    animation: fadeIn 1s ease-in;
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Я изучаю NODE.JS в JAVASCRIPT!</h1>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
