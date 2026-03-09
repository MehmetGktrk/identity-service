const authRepository = require('./auth.repository');



exports.registerUser = async(userData) => {
    
    const { email, password } = userData;

    const existingUser = await authRepository.findUserByEmail(email);



}