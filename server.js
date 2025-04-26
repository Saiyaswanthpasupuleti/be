const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb+srv://saiyaswanths959:ZwS2Dja2vnB2oWwS@cluster0.bbqz62l.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Error:', err));

// Create Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Create Model
const User = mongoose.model('User', userSchema);

// API Endpoint
app.post('/submit', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.json({ message: 'Data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
