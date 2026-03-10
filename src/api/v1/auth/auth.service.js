const ApiError = require('../../../utils/apiError');
const authRepository = require('./auth.repository');
const refreshTokenRepository = require('./refreshToken.repository');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../../../utils/jwt")



exports.registerUser = async(userData) => {
    
    const { email, password } = userData;

    const existingUser = await authRepository.findUserByEmail(email);
    
    if(existingUser){
        throw new ApiError(400, "USER_ALREADY_EXISTS", 'User Already Exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const result = await authRepository.createUser(user);

    return result;
}

exports.loginUser = async(userData) => {
    const { email, password } = userData;

    const user = await authRepository.findUserByEmail(email);

    if(!user){
        throw new ApiError(401, "INVALID_CREDENTIALS", 'Invalid Email or Password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw new ApiError(401, "INVALID_CREDENTIALS ", 'Invalid Email or Password');
    }

    const jwtPayload = {
        id: user._id.toString(),
    }

    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    await refreshTokenRepository.saveRefreshToken(user._id.toString(), refreshToken);

    return {
        user: user._id.toString(),
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

exports.refreshToken = async(token) => {
    
    if(!token){
        throw new ApiError(401, "REFRESH_TOKEN_REQUIRED", "Refresh token required");
    }

    const storedToken = await refreshTokenRepository.findRefreshToken(token);

    if(!storedToken){
        throw new ApiError(401, "INVALID_REFRESH_TOKEN", "Invalid refresh token");
    }

    const decoded = verifyRefreshToken(token);

    const accessToken = generateAccessToken({ id: decoded.id });

    return accessToken;    
}

exports.logout = async(refreshToken) => {
    
    if(!refreshToken){
        throw new ApiError(400, "TOKEN_REQUIRED", "Refresh token required");
    }

    await refreshTokenRepository.deleteRefreshToken(refreshToken);

    return true;
}

