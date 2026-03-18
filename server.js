const http = require('http');

const server = http.createServer((req, res) => {
    // Сервер сам создаёт HTML-страницу
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Node.js приложение</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f0f0;
            }
            h1 {
                color: #333;
                font-size: 48px;
                text-align: center;
                padding: 20px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
        </style>
    </head>
    <body>
        <h1>Я ИЗУЧАЮ NODE.JS В JAVASCRIPT</h1>
        <p>Сервер работает! Порт: ${process.env.PORT || 3000}</p>
    </body>
    </html>
    `;
    
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(html);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('🚀 Сервер успешно запущен на порту ' + port);
});
