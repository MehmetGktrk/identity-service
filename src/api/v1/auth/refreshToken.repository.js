const { getDB } = require("../../../database/connection");
const { ObjectId } = require("mongodb");


exports.saveRefreshToken = async(userId, token) => {
    
    const db = getDB();

    const newToken = {
        userId: new ObjectId(userId),
        token: token,
        createdAt: new Date()
    };

    await db.collection("Refresh_Tokens").insertOne(newToken);
}

exports.findRefreshToken = async(token) => {
    
    const db = getDB();

    const query = {
        token: token
    }

    return db.collection("Refresh_Tokens").findOne(query);
}

exports.deleteRefreshToken = async(token) => {
    
    const db = getDB();

    const query = {
        token: token
    }

    return db.collection("Refresh_Tokens").deleteOne(query);
}

