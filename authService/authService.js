const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "34.101.134.51",
  user: "bayu",
  password: "bayu",
  database: "arsip",
});

db.connect();

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT id, role FROM admin WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const user = result[0];
        if (user.role === "admin") {
          res.json({
            message: "Login successful",
            user_id: user.id,
            role: user.role,
          });
        } else {
          res
            .status(403)
            .json({ message: "Access denied. Only admins can log in here." });
        }
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    }
  );
});

app.post("/loginuser", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT id, role FROM admin WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const user = result[0];
        if (user.role === "user") {
          res.json({
            message: "Login successful",
            user_id: user.id,
            role: user.role,
          });
        } else {
          res
            .status(403)
            .json({ message: "Access denied. Only users can log in here." });
        }
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    }
  );
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM admin WHERE username = ?",
    [username],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(409).json({ message: "Username already exists" });
      } else {
        db.query(
          'INSERT INTO admin (username, password, role) VALUES (?, ?, "admin")',
          [username, password],
          (err) => {
            if (err) throw err;
            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    }
  );
});

app.post("/registeruser", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM admin WHERE username = ?",
    [username],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.status(409).json({ message: "Username already exists" });
      } else {
        db.query(
          'INSERT INTO admin (username, password, role) VALUES (?, ?, "user")',
          [username, password],
          (err) => {
            if (err) throw err;
            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
