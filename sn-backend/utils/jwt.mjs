import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';  // Store this securely

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
