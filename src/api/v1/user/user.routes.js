const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authMiddleware = require("../../../middlewares/auth.middleware");


// Use authMiddleware in all endpoints
router.use(authMiddleware)


router.get('/me', userController.getCurrentUser);
router.patch('/me', userController.updateCurrentUser);
router.delete('/me', userController.deleteCurrentUser);

module.exports = router;