const db = require('../database/db');

const createTaskTable = `
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description VARCHAR(255),
  completed BOOLEAN DEFAULT false
)
`;

db.query(createTaskTable, (err) => {
    if (err) {
        console.error('Error creating task table:'), err
    }
});

module.exports = {
    create: (title, decription) => {
        const query = 'INSERT INTO task (title, description) VALUES (?, ?)';
        return db.promise().execute(query, [title, decription]);
    },
    update: (id, completed) => {
        const query = 'UPDATE task SET completed = ? WHERE id = ?';
        return db.promise().execute(query, [completed, id]);
    },
};