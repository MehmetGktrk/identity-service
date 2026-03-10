const ApiError = require('../../../utils/apiError');
const authRepository = require('./auth.repository');
const bcrypt = require('bcrypt');
const { generateToken } = require("../../../utils/jwt")



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

    const jwt = await generateToken({jwtPayload});

    return jwt;
}

