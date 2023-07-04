const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.set('views', path.join(__dirname, 'views'));
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


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
    },
  })
);




app.engine('handlebars', exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
}).engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(authRoutes);
app.use(taskRoutes);

app.get('/', (req, res) => {
  res.render('index.hbs');
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

const port = 3007;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




