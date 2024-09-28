import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification error:", err.message); // Log error
      return res.sendStatus(401);
    }
    req.user = user; // This should include the user object
    console.log("Authenticated user:", req.user); // Log the user
    next();
  });
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};
export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
