import jwt from "jsonwebtoken";

export const generateToken = (_id, email) => {
  const key = process.env.SERVER_JWT_KEY;
  const expire = { expiresIn: process.env.SERVER_JWT_EXPIRY_TIME };
  const payload = { email: email, userId: _id };
  return jwt.sign(payload, key, expire);
};
