import User from '../models/user.mjs';
import { hashPassword } from '../utils/hashPassword.mjs';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.mjs';

// Signup controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Hash the password before saving
        const hashedPassword = hashPassword(password);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = generateToken(newUser);

        // Respond with user info and token
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
            token,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Login controller

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Step 1: Query user by email
      const user = await User.findOne({ where: { email } });
  
      // Step 2: Check if user exists
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Step 3: Compare entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // Step 4: If password is invalid
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Step 5: If both email and password are valid, proceed with login
      return res.status(200).json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  };


  // 1. Check if email exists
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.status(200).json({ message: 'Email verified. Proceed to reset password.' });
  } catch (error) {
    console.error('Forgot password error:', error); // This will help!
    res.status(500).json({ message: 'Server error' });
  }
};


// 2. Reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = hashPassword(newPassword);

    const updated = await User.update(
      { password: hashedPassword },
      { where: { email } }
    );

    if (updated[0] === 0) {
      return res.status(400).json({ message: 'Password update failed' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
  
  export default login;