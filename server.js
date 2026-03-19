const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ✅ ГЛАВНАЯ СТРАНИЦА - теперь сервер сам отдает HTML
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Мой Node.js проект</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Arial', sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0;
                }
                
                .container {
                    background: white;
                    padding: 3rem 4rem;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    text-align: center;
                }
                
                h1 {
                    font-size: 3em;
                    color: #333;
                }
                
                .highlight {
                    color: #667eea;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>я изучаю <span class="highlight">NODE.JS</span> в JAVASCRIPT</h1>
            </div>
        </body>
        </html>
    `);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
    console.log(`🌐 Откройте: https://${process.env.RAILWAY_STATIC_URL || 'localhost:' + PORT}`);
});
