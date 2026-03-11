require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    databaseName: process.env.DATABASE_NAME,
    port: process.env.PORT,

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpiration: "15m",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiration: "7d",

    maxSession: 3,

    updateUserAllowedFields: ["name", "surname", "phone", "nickname"]

}