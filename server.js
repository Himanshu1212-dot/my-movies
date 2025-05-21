import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import db from './db.js'; // Your existing knex config
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5500;

app.use(cors());
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Generate a random salt (16 bytes)
    const salt = crypto.randomBytes(16).toString('hex');

    // Hash the password with the salt using SHA-256
    const hashedPassword = crypto.createHash('sha256')
    .update(password + salt)  // Combine password and salt
    .digest('hex')
    
    await db('users').insert({ email, password: hashedPassword }); // Insert into 'users' table
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to insert user '+err+'.' });
  }
});

app.get('/api/check-email', async (req, res) => {
    const { email: userEmail } = req.query;
    // Check if email is provided
    if (!userEmail) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    try {
        // Query the database to check if the email exists
        const result = await db('users').where({ email: userEmail }).first();

        if (result) {
            // Email already exists
            return res.json({ success: false, message: 'Email already exists. Please choose a different email.' });
        }

        // Email is available
        return res.json({ success: true, message: 'Email is available.' });
    } catch (err) {
        // Error handling in case of database issue
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Home page
app.get('/signup', (req, res) => {
  // Send the registration HTML file
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});