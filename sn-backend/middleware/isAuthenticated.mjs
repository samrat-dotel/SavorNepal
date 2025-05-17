import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔐 Check if Authorization header is present and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 🔍 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach decoded user info to request
    req.user = decoded;

    // Optional: Log decoded user for debugging
    // console.log('Authenticated user:', decoded);

    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
