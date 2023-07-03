const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const exphbs = require('express-handlebars');

const path = require('path');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(authRoutes);
app.use(taskRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password1',
  database: 'task_manager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const port = 3004;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
