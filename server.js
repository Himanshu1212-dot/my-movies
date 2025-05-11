import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import db from './db.js'; // Your existing knex config

const app = express();
const PORT = 5500;

app.use(cors());
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
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to insert user '+err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});