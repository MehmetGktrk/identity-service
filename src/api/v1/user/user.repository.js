const { getDB } = require("../../../database/connection");
const { ObjectId } = require("mongodb");
const { USER_SAFE_PROJECTION } = require("./user.constants");


exports.findUserById = async(userId) => {
    
    const db = getDB();

    return db.collection("Users").findOne({ _id: new ObjectId(userId) }, { projection: USER_SAFE_PROJECTION });
}

exports.updateUserById = async(userId, updateData) => {
    
    const db = getDB();

    const data = {
        ...updateData,
        updatedAt: new Date()
    }

    await db.collection("Users").updateOne({ _id: new ObjectId(userId) }, { $set: data });

    return db.collection("Users").findOne({ _id: new ObjectId(userId) }, { projection: USER_SAFE_PROJECTION });
}

exports.deleteUserById = async(userId) => {
    
    const db = getDB();
    const objectUserId = new ObjectId(userId);

    // Delete user document
    const result = await db.collection("Users").deleteOne({ _id: objectUserId });

    // Delete all refresh tokens
    await db.collection("Refresh_Tokens").deleteMany({ userId: objectUserId });

    return result;
}