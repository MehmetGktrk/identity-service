const ApiError = require("../../../utils/apiError");
const userRepository = require("./user.repository");
const config = require("../../../config/config");


exports.getCurrentUser = async(userId) => {

    const user = await userRepository.findUserById(userId);

    if(!user){
        throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }

    return user;
}

exports.updateCurrentUser = async(userId, userData) => {

    const allowedFields = config.updateUserAllowedFields;

    const updateData = {}

    for(const field of allowedFields){
        if(userData[field] !== undefined){
            updateData[field] = userData[field];
        }
    }

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(
            400,
            "No valid fields to update",
            "INVALID_UPDATE_DATA"
        );
    }

    const updatedUser = await userRepository.updateUserById(userId, updateData);

    if(!updatedUser){
        throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }

    return updatedUser;
}

exports.deleteCurrentUser = async(userId) => {

    const deleteUser = await userRepository.deleteUserById(userId);

    if(deleteUser.deletedCount === 0){
        throw new ApiError(404, "USER_NOT_FOUND", "User not found");
    }

    return true;
}