const authService = require("./auth.service");


exports.register = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.registerUser(email, password);
        
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (err) {
        return next(err);
    }
}

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const jwtToken = await authService.loginUser(email, password);

        return res.status(200).json({
            success: true,
            message: 'Authentication successful',
            jwtToken: jwtToken
        });
    } catch (err) {
        return next(err);
    }
}

exports.refresh = async(req, res, next) => {
    try {
        const { refreshToken } = req.body;
        
        const token = await authService.refreshToken(refreshToken);

        return res.status(200).json({
            success: true,
            token: token
        });

    } catch (err) {
        next(err);
    }
}

exports.logout = async(req, res, next) => {
    try {
        const { refreshToken } = req.body;

        await authService.logout(refreshToken);

        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        })
    } catch (err) {
        return next(err);
    }
}