const { getDB } = require("../../../database/connection");
const { ObjectId } = require("mongodb");
const config = require("../../../config/config")


exports.saveRefreshToken = async(userId, token) => {
    
    const db = getDB();

    const tokens = await db.collection("Refresh_Tokens")
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: 1 })
    .toArray();

    if(tokens.length >= config.maxSession){
        const oldestToken = tokens[0];

        await db.collection("Refresh_Tokens").deleteOne({ _id: oldestToken._id });
    }

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

