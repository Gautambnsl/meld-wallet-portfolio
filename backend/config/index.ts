import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SALT_ROUND: parseInt(`${process.env.SALT_ROUND}`),
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_EXPIRE: process.env.JWT_EXPIRE
};
