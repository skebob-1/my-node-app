const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;  // Берем порт из переменной Railway

app.get('/', (req, res) => {
    res.send('Я изучаю NODE.JS в JAVASCRIPT!');
});

app.get('/about', (req, res) => {
    res.send('О техникуме');
});

app.get('/contact', (req, res) => {
    res.send('Контакты');
});

// Слушаем на всех интерфейсах (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
