const jwt = require("jsonwebtoken");
const config = require('../config/config');


async function generateToken(payload) {
    const token = jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: config.jwtExpiration }
    );

    return token;
}



async function verifyToken(token) {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
}


module.exports = {
    generateToken,
    verifyToken
}
