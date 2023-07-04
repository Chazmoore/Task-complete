const db = require('../database/db');


const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  isAdmin BOOLEAN DEFAULT false
)
`;

db.query(createUserTable, (err) => {
    if (err) {
        console.error('Error creating users table:', err);
    }
});

module.exports = {
    create: (username, password) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        return db.promise().execute(query, [username, hashedPassword]);
    },
    findByUsername: (username) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        return db.promise().execute(query, [username]);
      },
      
};