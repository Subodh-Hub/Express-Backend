import jwt from "jsonwebtoken";

// Middleware to check JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // token comes from headers

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer token" → split and get token

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = decoded; // attach user info (id, role, reference_id) to request
    next(); // continue to the next middleware / controller
  });
};

// Middleware to allow only certain roles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};
