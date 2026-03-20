const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Мидлвар для статических файлов (если нужны будут)
app.use(express.static('public'));

// Главная страница
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Node.js проект</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
                    font-family: 'Arial', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                
                h1 {
                    color: #2d3436;
                    font-size: 3.5em;
                    text-shadow: 2px 2px 4px rgba(255,255,255,0.5);
                    margin-bottom: 20px;
                }
                
                .nav {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
                
                .nav a {
                    color: #2d3436;
                    text-decoration: none;
                    margin-left: 20px;
                    font-size: 1.2em;
                    padding: 10px;
                }
                
                .nav a:hover {
                    background: rgba(255,255,255,0.3);
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="nav">
                <a href="/">Главная</a>
                <a href="/about">О техникуме</a>
                <a href="/contact">Контакты</a>
            </div>
            <h1>Я изучаю NODE.JS в JAVASCRIPT!</h1>
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
                    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
                    font-family: 'Arial', sans-serif;
                    padding: 20px;
                }
                
                .nav {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
                
                .nav a {
                    color: #2d3436;
                    text-decoration: none;
                    margin-left: 20px;
                    font-size: 1.2em;
                    padding: 10px;
                }
                
                .nav a:hover {
                    background: rgba(255,255,255,0.3);
                    border-radius: 5px;
                }
                
                .container {
                    max-width: 800px;
                    margin: 50px auto;
                    background: rgba(255,255,255,0.9);
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                
                h1 {
                    color: #2d3436;
                    margin-bottom: 20px;
                }
                
                p {
                    color: #555;
                    line-height: 1.6;
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
                <p>Наш техникум готовит специалистов по Node.js и современным веб-технологиям. Мы обучаем студентов практическим навыкам разработки серверных приложений, работы с базами данных и создания API.</p>
                <p>Программа обучения включает:</p>
                <ul>
                    <li>Основы JavaScript</li>
                    <li>Node.js и Express</li>
                    <li>Работа с базами данных (MySQL)</li>
                    <li>Создание REST API</li>
                    <li>Деплой приложений</li>
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
                    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
                    font-family: 'Arial', sans-serif;
                    padding: 20px;
                }
                
                .nav {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
                
                .nav a {
                    color: #2d3436;
                    text-decoration: none;
                    margin-left: 20px;
                    font-size: 1.2em;
                    padding: 10px;
                }
                
                .nav a:hover {
                    background: rgba(255,255,255,0.3);
                    border-radius: 5px;
                }
                
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background: rgba(255,255,255,0.9);
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                
                h1 {
                    color: #2d3436;
                    margin-bottom: 30px;
                }
                
                .contact-info {
                    margin: 20px 0;
                }
                
                .contact-item {
                    margin: 15px 0;
                    padding: 10px;
                    border-bottom: 1px solid #eee;
                }
                
                .contact-item strong {
                    color: #2d3436;
                    width: 100px;
                    display: inline-block;
                }
                
                .contact-item span {
                    color: #555;
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
                <div class="contact-info">
                    <div class="contact-item">
                        <strong>Email:</strong>
                        <span>info@technical.ru</span>
                    </div>
                    <div class="contact-item">
                        <strong>Телефон:</strong>
                        <span>+7 (999) 123-45-67</span>
                    </div>
                    <div class="contact-item">
                        <strong>Адрес:</strong>
                        <span>г. Москва, ул. Программистов, д. 42</span>
                    </div>
                    <div class="contact-item">
                        <strong>Часы работы:</strong>
                        <span>Пн-Пт: 9:00 - 18:00</span>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
    console.log(`🌐 Главная: http://localhost:${PORT}`);
    console.log(`🌐 О техникуме: http://localhost:${PORT}/about`);
    console.log(`🌐 Контакты: http://localhost:${PORT}/contact`);
});
