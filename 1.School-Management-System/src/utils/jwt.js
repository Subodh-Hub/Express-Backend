import jwt from "jsonwebtoken";

// Short-lived token for accessing protected routes
export const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      reference_id: user.reference_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }, // access token lasts 15 minutes
  );
};

// Long-lived token for refreshing access token
export const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      reference_id: user.reference_id,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }, // refresh token lasts 7 days
  );
};
