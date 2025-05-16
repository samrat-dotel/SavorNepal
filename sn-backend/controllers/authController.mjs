import User from '../models/user.mjs';
import { hashPassword } from '../utils/hashPassword.mjs';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.mjs';

// Signup controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        const hashedPassword = hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'  // default role
        });

        const token = generateToken(newUser);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role  // ✅ include role
            },
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
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user); // ✅ generate token here too

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role  // ✅ include role
            },
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
};

// Forgot password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.status(200).json({ message: 'Email verified. Proceed to reset password.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset password
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
