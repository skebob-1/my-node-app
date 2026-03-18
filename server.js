const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('🔥 Получен запрос:', req.url);
    
    fs.readFile('index.html', (err, data) => {
        if (err) {
            console.log('❌ Ошибка чтения index.html:', err);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<h1>Я ИЗУЧАЮ NODE.JS В JAVASCRIPT</h1>');
            return;
        }
        
        console.log('✅ Файл index.html найден, отправляю...');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('🚀 Сервер успешно запущен на порту ' + port);
    console.log('🌐 Сайт доступен по адресу: http://localhost:' + port);
});
