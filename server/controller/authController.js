const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper functions for validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number, one special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Email format validation
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password strength validation
    if (!isValidPassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
      });
    }

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

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

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
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    res.status(501).json({ message: 'Server error' });
  }
};

module.exports = { signup, login };



















































// const User = require('../model/userModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');


// const signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
    
//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const newUser = await User.create({ username, email, password });
//     res.status(201).json({ 
//       message: 'User created successfully',
//       user: { id: newUser.id, email: newUser.email }
//     });
//   } catch (error) {
//     res.status(501).json({ message: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({ 
//       message: 'Login successfull',
//       token,
//       user: { id: user.id, email: user.email }
//     });
//   } catch (error) {
//     res.status(501).json({ message: 'Server error' });
//   }
// };

// module.exports = { signup, login };