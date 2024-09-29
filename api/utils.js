import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Use optional chaining for safety

  if (!token) {
    console.log("No token provided"); // Log for missing token
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification error:", err.message); // Log verification error
      return res.sendStatus(401);
    }

    req.user = user; // Assign the user object to the request
    console.log("Authenticated user:", req.user); // Log authenticated user
    next(); // Proceed to the next middleware or route handler
  });
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};
export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
