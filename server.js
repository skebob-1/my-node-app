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

// Создаем 2 таблицы по 7 полей
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
    `);

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
    `);

    console.log('✅ Таблицы созданы');
}

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

// Добавление тестовых данных
app.get('/add-test-data', (req, res) => {
    // Добавляем студентов
    db.query(`
        INSERT INTO students (full_name, email, phone, group_name, course_year, average_grade) VALUES
        ('Иван Петров', 'ivan@email.com', '+7 999 123-45-67', 'ИТ-21', 2, 4.5),
        ('Анна Смирнова', 'anna@email.com', '+7 999 234-56-78', 'ИТ-21', 2, 4.8),
        ('Петр Сидоров', 'petr@email.com', '+7 999 345-67-89', 'ИТ-22', 1, 4.2)
    `, (err) => {
        if (err) console.log('Студенты уже есть:', err.message);
    });

    // Добавляем преподавателей
    db.query(`
        INSERT INTO teachers (full_name, email, phone, subject, experience, salary, hire_date) VALUES
        ('Мария Иванова', 'maria@email.com', '+7 999 456-78-90', 'Node.js', 5, 75000, '2023-09-01'),
        ('Алексей Петров', 'alexey@email.com', '+7 999 567-89-01', 'MySQL', 8, 85000, '2022-01-15'),
        ('Елена Сидорова', 'elena@email.com', '+7 999 678-90-12', 'JavaScript', 3, 65000, '2024-02-01')
    `, (err) => {
        if (err) console.log('Преподаватели уже есть:', err.message);
    });

    res.send('✅ Тестовые данные добавлены! <a href="/">На главную</a>');
});

// Главная страница
app.get('/', (req, res) => {
    // Получаем количество студентов и преподавателей
    db.query('SELECT COUNT(*) as count FROM students', (err1, students) => {
        db.query('SELECT COUNT(*) as count FROM teachers', (err2, teachers) => {
            const studentCount = students?.[0]?.count || 0;
            const teacherCount = teachers?.[0]?.count || 0;

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
                            color: white;
                            font-size: 3em;
                            margin-bottom: 30px;
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
                            gap: 30px;
                            margin: 50px 0;
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
                        .stat-label {
                            font-size: 1.2em;
                            margin-top: 10px;
                        }
                        .api-link {
                            margin-top: 40px;
                        }
                        .api-link a {
                            color: white;
                            background: rgba(255,255,255,0.2);
                            padding: 10px 20px;
                            border-radius: 5px;
                            text-decoration: none;
                            margin: 0 10px;
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

                        <div class="stats">
                            <div class="stat-card">
                                <div class="stat-number">${studentCount}</div>
                                <div class="stat-label">Студентов</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number">${teacherCount}</div>
                                <div class="stat-label">Преподавателей</div>
                            </div>
                        </div>

                        <div class="api-link">
                            <a href="/api/students">📊 Список студентов</a>
                            <a href="/api/teachers">👨‍🏫 Список преподавателей</a>
                            <a href="/add-test-data">➕ Добавить тестовые данные</a>
                        </div>
                    </div>
                </body>
                </html>
            `);
        });
    });
});

// Страница "О техникуме"
app.get('/about', (req, res) => {
    db.query('SELECT * FROM students', (err1, students) => {
        db.query('SELECT * FROM teachers', (err2, teachers) => {
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
                            padding: 20px;
                        }
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                        }
                        .nav {
                            margin-bottom: 30px;
                            text-align: center;
                        }
                        .nav a {
                            color: white;
                            margin: 0 15px;
                            text-decoration: none;
                            padding: 8px 15px;
                            border: 1px solid white;
                            border-radius: 3px;
                        }
                        .nav a:hover {
                            background: white;
                            color: #667eea;
                        }
                        .content {
                            background: rgba(255,255,255,0.1);
                            padding: 30px;
                            border-radius: 10px;
                        }
                        h1 {
                            font-size: 2.5em;
                            text-align: center;
                        }
                        .tables {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 20px;
                            margin-top: 30px;
                        }
                        .table-card {
                            background: rgba(255,255,255,0.05);
                            padding: 20px;
                            border-radius: 8px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 15px;
                        }
                        th, td {
                            padding: 10px;
                            text-align: left;
                            border-bottom: 1px solid rgba(255,255,255,0.2);
                        }
                        th {
                            background: rgba(255,255,255,0.1);
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
                        
                        <div class="content">
                            <h1>О техникуме</h1>
                            <p>Наш техникум готовит специалистов по Node.js и современным веб-технологиям.</p>
                            
                            <div class="tables">
                                <div class="table-card">
                                    <h3>Студенты (${students?.length || 0})</h3>
                                    <table>
                                        <tr>
                                            <th>Имя</th>
                                            <th>Группа</th>
                                            <th>Средний балл</th>
                                        </tr>
                                        ${students?.map(s => `
                                            <tr>
                                                <td>${s.full_name}</td>
                                                <td>${s.group_name}</td>
                                                <td>${s.average_grade}</td>
                                            </tr>
                                        `).join('') || '<tr><td colspan="3">Нет данных</td></tr>'}
                                    </table>
                                </div>
                                
                                <div class="table-card">
                                    <h3>Преподаватели (${teachers?.length || 0})</h3>
                                    <table>
                                        <tr>
                                            <th>Имя</th>
                                            <th>Предмет</th>
                                            <th>Опыт</th>
                                        </tr>
                                        ${teachers?.map(t => `
                                            <tr>
                                                <td>${t.full_name}</td>
                                                <td>${t.subject}</td>
                                                <td>${t.experience} лет</td>
                                            </tr>
                                        `).join('') || '<tr><td colspan="3">Нет данных</td></tr>'}
                                    </table>
                                </div>
                            </div>
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
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                }
                .nav {
                    margin-bottom: 30px;
                    text-align: center;
                }
                .nav a {
                    color: white;
                    margin: 0 15px;
                    text-decoration: none;
                    padding: 8px 15px;
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
                h1 {
                    font-size: 2.5em;
                    text-align: center;
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});const express = require('express');
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
