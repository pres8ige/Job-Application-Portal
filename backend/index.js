const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON body from incoming requests

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'job',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Handle POST request to insert a new user
app.post('/', (req, res) => {
  const { username, password } = req.body;
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
    console.log(result);
    res.status(200).send("User inserted successfully");
  });
});

app.post('/apply', (req, res) => {
  const { companyId, companyName, applicantName, email, mobile, dob, applicantId } = req.body;

  if (!companyId || !applicantName || !email || !mobile || !dob || !applicantId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const sql = `INSERT INTO job_applications (company_id, company_name, applicant_name, email, mobile, dob, applicant_id) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [companyId, companyName, applicantName, email, mobile, dob, applicantId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error. Please try again later." });
    }
    res.status(200).json({ message: "Application submitted successfully!" });
  });
});

// Handle POST request for Contact Us form
app.post('/contact', async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const sql = `INSERT INTO contact_messages (full_name, email, subject, message) VALUES (?, ?, ?, ?)`;

  db.query(sql, [fullName, email, subject, message], async (err, result) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // Optional axios post to notify an external service
    try {
      await axios.post('https://httpbin.org/post', { fullName, email, subject, message });
    } catch (error) {
      console.warn("External notification failed:", error.message);
    }

    res.status(200).json({ message: "Message sent successfully!" });
  });
});

app.get('/applications', (req, res) => {
  const sql = "SELECT * FROM job_applications";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error. Please try again later." });
    }
    res.status(200).json(results);
  });
});

app.post("/sign", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = result[0];

    // Direct password comparison (since bcrypt is not used)
    if (password === user.password) {
      return res.json({ message: "Login successful", redirectTo: "/home" });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});



app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
