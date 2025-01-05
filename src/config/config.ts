import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_ACCESS_TOKEN || !process.env.JWT_REFRESH_TOKEN) {
  throw new Error("JWT tokens must be defined in environment variables");
}

export const config = {
  jwt: {
    sessionSecret: process.env.JWT_ACCESS_TOKEN,
    refreshSecret: process.env.JWT_REFRESH_TOKEN,
    sessionExpiresIn: "1h",
    refreshExpiresIn: "7d",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
  smtp: {
    user: process.env.EMAIL_USER || "nitinmalviya172@gmail.com",
    password: process.env.EMAIL_PASSWORD || "nmcg rfyn hvto yhia",
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: process.env.EMAIL_SECURE === "true",
  },
};
