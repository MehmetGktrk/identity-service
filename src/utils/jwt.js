const jwt = require("jsonwebtoken");
const config = require('../config/config');


function generateAccessToken(payload) {
    const token = jwt.sign(
        payload,
        config.jwtAccessSecret,
        { expiresIn: config.jwtAccessExpiration }
    );

    return token;
}

function generateRefreshToken(payload) {
    const token = jwt.sign(
        payload,
        config.jwtRefreshSecret,
        { expiresIn: config.jwtRefreshExpiration }
    )

    return token;
}

function verifyAccessToken(token) {
    const decoded = jwt.verify(token, config.jwtAccessSecret);
    return decoded;
}

function verifyRefreshToken(token) {
    const decoded = jwt.verify(token, config.jwtRefreshSecret);
    return decoded;
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}
