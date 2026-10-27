const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "No token provided" });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const user = {
      id: decoded.id,
      role: decoded.role,
      reference_id: decoded.reference_id,
    };

    const newAccessToken = createAccessToken(user);

    res.json({
      success: true,
      accessToken: newAccessToken,
    });
  });
};

export { refreshToken };
