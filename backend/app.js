const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE user (id INTEGER PRIMARY KEY, username TEXT, email TEXT, phone TEXT)");
  db.run("INSERT INTO user (username, email, phone) VALUES ('JohnDoe', 'john@example.com', '123456789')");
});

// Get user profile
app.get('/api/profile', (req, res) => {
  db.get("SELECT * FROM user WHERE id = 1", (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(row);
    }
  });
});

// Update user profile
app.post('/api/profile', (req, res) => {
  const { username, email, phone } = req.body;
  db.run(`UPDATE user SET username = ?, email = ?, phone = ? WHERE id = 1`,
    [username, email, phone], (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send("Profile updated successfully");
      }
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

