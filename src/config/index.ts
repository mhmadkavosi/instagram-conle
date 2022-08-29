import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGODB_URI,
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  api: {
    prefix: '/api',
  },
  saltWorkFactor: process.env.saltWorkFactor,
  accessTokenTtl: process.env.accessTokenTtl,
  refreshTokenTtl: process.env.refreshTokenTtl,
  privateKey: process.env.privateKey
}