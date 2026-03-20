const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Главная страница
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Главная</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                h1 {
                    color: white;
                    font-size: 3em;
                }
                .nav {
                    margin-top: 50px;
                }
                .nav a {
                    color: white;
                    margin: 0 20px;
                    font-size: 1.2em;
                    text-decoration: none;
                    padding: 10px 20px;
                    border: 2px solid white;
                    border-radius: 5px;
                }
                .nav a:hover {
                    background: white;
                    color: #667eea;
                }
            </style>
        </head>
        <body>
            <h1>Я изучаю NODE.JS в JAVASCRIPT!</h1>
            <div class="nav">
                <a href="/">Главная</a>
                <a href="/about">О техникуме</a>
                <a href="/contact">Контакты</a>
            </div>
        </body>
        </html>
    `);
});

// Страница "О техникуме"
app.get('/about', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>О техникуме</title>
            <style>
                body {
                    margin: 0;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: Arial, sans-serif;
                    color: white;
                    padding: 50px;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 10px;
                }
                h1 {
                    font-size: 2.5em;
                }
                p {
                    font-size: 1.2em;
                    line-height: 1.6;
                }
                .nav {
                    margin-bottom: 30px;
                }
                .nav a {
                    color: white;
                    margin-right: 20px;
                    text-decoration: none;
                    padding: 5px 10px;
                    border: 1px solid white;
                    border-radius: 3px;
                }
                .nav a:hover {
                    background: white;
                    color: #667eea;
                }
            </style>
        </head>
        <body>
            <div class="nav">
                <a href="/">Главная</a>
                <a href="/about">О техникуме</a>
                <a href="/contact">Контакты</a>
            </div>
            <div class="container">
                <h1>О техникуме</h1>
                <p>Наш техникум готовит специалистов по Node.js и современным веб-технологиям. Мы обучаем студентов практическим навыкам разработки серверных приложений.</p>
                <p>Программа обучения:</p>
                <ul>
                    <li>JavaScript</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MySQL</li>
                    <li>REST API</li>
                </ul>
            </div>
        </body>
        </html>
    `);
});

// Страница "Контакты"
app.get('/contact', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Контакты</title>
            <style>
                body {
                    margin: 0;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: Arial, sans-serif;
                    color: white;
                    padding: 50px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 10px;
                }
                h1 {
                    font-size: 2.5em;
                }
                .info {
                    margin: 30px 0;
                    font-size: 1.2em;
                }
                .info p {
                    margin: 15px 0;
                    padding: 10px;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                }
                .nav {
                    margin-bottom: 30px;
                }
                .nav a {
                    color: white;
                    margin-right: 20px;
                    text-decoration: none;
                    padding: 5px 10px;
                    border: 1px solid white;
                    border-radius: 3px;
                }
                .nav a:hover {
                    background: white;
                    color: #667eea;
                }
            </style>
        </head>
        <body>
            <div class="nav">
                <a href="/">Главная</a>
                <a href="/about">О техникуме</a>
                <a href="/contact">Контакты</a>
            </div>
            <div class="container">
                <h1>Контакты</h1>
                <div class="info">
                    <p><strong>Email:</strong> info@technical.ru</p>
                    <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
                    <p><strong>Адрес:</strong> г. Москва, ул. Программистов, д. 42</p>
                    <p><strong>Часы работы:</strong> Пн-Пт 9:00-18:00</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
