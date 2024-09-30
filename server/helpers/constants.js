const BASE_PATH = '/api/v1';
const MONGODB_URI = process.env.MONGODB_URI;
const TOKEN_SECRET = process.env.TOKEN_SECRET || '<PASSWORD>';
const PORT = process.env.PORT || '3000';
const NODE_ENV = process.env.NODE_ENV || 'development';
const TOKEN_COOKIE_NAME = 'token';
const TOKEN_EXPIRES_IN = '1d';

module.exports = {
    BASE_PATH,
    MONGODB_URI,
    TOKEN_SECRET,
    PORT,
    NODE_ENV,
    TOKEN_COOKIE_NAME,
    TOKEN_EXPIRES_IN
};
