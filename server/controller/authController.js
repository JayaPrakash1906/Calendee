const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = await User.create({ username, email, password });
    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: newUser.id, email: newUser.email }
    });
  } catch (error) {
    res.status(501).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Login successfull',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(501).json({ message: 'Server error' });
  }
};

module.exports = { signup, login };