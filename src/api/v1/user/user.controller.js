const userService = require("./user.service");

exports.getCurrentUser = async(req, res, next) => {
    try {
        const user = await userService.getCurrentUser(req.user.id);

        return res.status(200).json({
            success: true,
            message: "User data retrieved successfully",
            userData: user
        });

    } catch (err) {
        return next(err)
    }
}

exports.updateCurrentUser = async(req, res, next) => {
    try {
        const { userData } = req.body;

        const result = await userService.updateCurrentUser(req.user.id, userData);

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            updatedUser: result
        });
        
    } catch (err) {
        return next(err);
    }
}

exports.deleteCurrentUser = async(req, res, next) => {
    try {
        const result = await userService.deleteCurrentUser(req.user.id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (err) {
        return next(err);
    }
}