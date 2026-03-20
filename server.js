const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MySQL
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'railway'
});

db.connect(err => {
    if (err) {
        console.error('❌ Ошибка подключения к БД:', err);
    } else {
        console.log('✅ Подключено к MySQL');
        createTables();
    }
});

// Создаем 2 таблицы по 7 полей (без photo_url)
function createTables() {
    // Таблица студентов (7 полей)
    db.query(`
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(20),
            group_name VARCHAR(50),
            course_year INT,
            average_grade DECIMAL(3,2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('Ошибка создания таблицы students:', err);
        else console.log('✅ Таблица students создана');
    });

    // Таблица преподавателей (7 полей)
    db.query(`
        CREATE TABLE IF NOT EXISTS teachers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(20),
            subject VARCHAR(100),
            experience INT,
            salary DECIMAL(10,2),
            hire_date DATE
        )
    `, (err) => {
        if (err) console.error('Ошибка создания таблицы teachers:', err);
        else console.log('✅ Таблица teachers создана');
    });
}

// Добавляем тестовые данные
app.get('/add-test-data', (req, res) => {
    // Добавляем студента
    db.query(
        'INSERT INTO students (full_name, email, phone, group_name, course_year, average_grade) VALUES (?, ?, ?, ?, ?, ?)',
        ['Иван Петров', 'ivan@email.com', '+7 999 123-45-67', 'ИТ-21', 2, 4.5],
        (err) => {
            if (err) console.log('Студент уже есть:', err);
        }
    );
    
    // Добавляем преподавателя
    db.query(
        'INSERT INTO teachers (full_name, email, phone, subject, experience, salary, hire_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Мария Сидорова', 'maria@email.com', '+7 999 765-43-21', 'Node.js', 5, 75000.00, '2023-09-01'],
        (err) => {
            if (err) console.log('Преподаватель уже есть:', err);
        }
    );
    
    res.send('✅ Тестовые данные добавлены!');
});

// API для получения данных
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/teachers', (req, res) => {
    db.query('SELECT * FROM teachers', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

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
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    font-family: Arial, sans-serif;
                    color: white;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 50px 20px;
                    text-align: center;
                }
                h1 {
                    font-size: 3em;
                    margin-bottom: 40px;
                }
                .nav {
                    margin: 40px 0;
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
                .stats {
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    margin-top: 50px;
                }
                .stat-card {
                    background: rgba(255,255,255,0.1);
                    padding: 30px;
                    border-radius: 10px;
                    min-width: 200px;
                }
                .stat-number {
                    font-size: 2.5em;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Я изучаю NODE.JS в JAVASCRIPT!</h1>
                <div class="nav">
                    <a href="/">Главная</a>
                    <a href="/about">О техникуме</a>
                    <a href="/contact">Контакты</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Страница "О техникуме"
app.get('/about', (req, res) => {
    // Получаем статистику из БД
    db.query('SELECT COUNT(*) as student_count FROM students', (err, studentResult) => {
        db.query('SELECT COUNT(*) as teacher_count FROM teachers', (err2, teacherResult) => {
            const students = studentResult[0]?.student_count || 0;
            const teachers = teacherResult[0]?.teacher_count || 0;
            
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
                        }
                        .container {
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 50px 20px;
                        }
                        h1 {
                            font-size: 2.5em;
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
                        .stats {
                            display: flex;
                            gap: 30px;
                            margin: 40px 0;
                        }
                        .stat-card {
                            background: rgba(255,255,255,0.1);
                            padding: 30px;
                            border-radius: 10px;
                            text-align: center;
                            flex: 1;
                        }
                        .stat-number {
                            font-size: 3em;
                            font-weight: bold;
                        }
                        .info-text {
                            background: rgba(255,255,255,0.1);
                            padding: 30px;
                            border-radius: 10px;
                            line-height: 1.6;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="nav">
                            <a href="/">Главная</a>
                            <a href="/about">О техникуме</a>
                            <a href="/contact">Контакты</a>
                        </div>
                        <h1>О техникуме</h1>
                        
                        <div class="stats">
                            <div class="stat-card">
                                <div class="stat-number">${students}</div>
                                <div>Студентов</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number">${teachers}</div>
                                <div>Преподавателей</div>
                            </div>
                        </div>
                        
                        <div class="info-text">
                            <h2>Наш техникум</h2>
                            <p>Мы готовим специалистов по Node.js и современным веб-технологиям. Обучение длится 2 года и включает практические занятия по разработке серверных приложений.</p>
                            <p>В программе: JavaScript, Node.js, Express, MySQL, создание REST API и деплой проектов.</p>
                        </div>
                    </div>
                </body>
                </html>
            `);
        });
    });
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
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 50px 20px;
                }
                h1 {
                    font-size: 2.5em;
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
                .contact-card {
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 10px;
                }
                .info p {
                    margin: 20px 0;
                    padding: 10px;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                    font-size: 1.2em;
                }
                .info strong {
                    display: inline-block;
                    width: 120px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="nav">
                    <a href="/">Главная</a>
                    <a href="/about">О техникуме</a>
                    <a href="/contact">Контакты</a>
                </div>
                
                <div class="contact-card">
                    <h1>Контакты</h1>
                    <div class="info">
                        <p><strong>Email:</strong> info@technical.ru</p>
                        <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
                        <p><strong>Адрес:</strong> г. Москва, ул. Программистов, д. 42</p>
                        <p><strong>Часы работы:</strong> Пн-Пт 9:00-18:00</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
