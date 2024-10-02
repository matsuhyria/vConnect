const BASE_PATH = '/api/v1';
const MONGODB_URI = process.env.MONGODB_URI;
const TOKEN_SECRET = process.env.TOKEN_SECRET || '<PASSWORD>';
const TOKEN_EXPIRES_IN = '1d';
const PORT = process.env.PORT || '3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    BASE_PATH,
    MONGODB_URI,
    TOKEN_SECRET,
    TOKEN_EXPIRES_IN,
    PORT,
    NODE_ENV,
};
