require('dotenv').config();

module.exports = {
    serverPort: 3000,
    databaseUser: process.env.DB_USER,
    databasePassword: process.env.DB_PASSWORD,
    databaseHost: process.env.DB_HOST,
    databaseName: process.env.DB_NAME,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    userEmail: process.env.USER_EMAIL, 
    userPassword: process.env.USER_PASSWORD,
    PortMailer: process.env.PORT_MAILER,
};

