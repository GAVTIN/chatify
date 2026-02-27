import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie("jwt", token, {
        httpOnly: true, // Cookie is only accessible by the server
        secure: process.env.NODE_ENV === "production" ? true : false, // Use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        sameSite: "strict", // Prevent CSRF attacks
    });
    return token;
};