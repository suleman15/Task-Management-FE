import dotenv from "dotenv";
import process from "node:process";

dotenv.config({
  path: "src/config/config.env",
});

const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const CYPRES_SECRET = process.env.CYPRES_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
export {
  PORT,
  DATABASE_URI,
  NODE_ENV,
  JWT_SECRET,
  SMTP_USERNAME,
  SMTP_EMAIL,
  SMTP_PASSWORD,
  CYPRES_SECRET,
  JWT_EXPIRE,
};
