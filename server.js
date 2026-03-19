const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


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
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0;
                    padding: 20px;
                }
                
                .container {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 3rem 4rem;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    text-align: center;
                    max-width: 800px;
                    width: 100%;
                    animation: fadeIn 1s ease-in;
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                h1 {
                    font-size: 3.5em;
                    color: #333;
                    margin-bottom: 20px;
                    line-height: 1.3;
                }
                
                .highlight {
                    color: #667eea;
                    font-weight: bold;
                }
                
                .subtitle {
                    font-size: 1.2em;
                    color: #666;
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 2px solid #f0f0f0;
                }
                
                .version {
                    display: inline-block;
                    background: #667eea;
                    color: white;
                    padding: 5px 15px;
                    border-radius: 25px;
                    font-size: 0.9em;
                    margin-top: 20px;
                }
                
                @media (max-width: 768px) {
                    .container {
                        padding: 2rem;
                    }
                    
                    h1 {
                        font-size: 2.5em;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>я изучаю <span class="highlight">NODE.JS</span> в JAVASCRIPT</h1>
                <div class="subtitle">
                    <p>Техникум • Версия 22-23</p>
                </div>
                <div class="version">Node.js v22</div>
            </div>
        </body>
        </html>
    `);
});

app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'running', 
        message: 'Сервер работает',
        nodeVersion: process.version 
    });
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
    console.log(`🌐 Откройте: http://localhost:${PORT}`);
});
