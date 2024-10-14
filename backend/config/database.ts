const mysql = require('mysql2/promise');
import config from '.';

const connectToDataBase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
    });
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.log('catch', error);
  }
};

export default connectToDataBase;
