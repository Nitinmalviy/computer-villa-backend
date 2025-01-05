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
};
