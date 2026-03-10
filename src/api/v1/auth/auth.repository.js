const { getDB } = require('../../../database/connection');

exports.findUserByEmail = async(email) => {
    const db = getDB();

    return db.collection('Users').findOne({ email: email});
}

exports.createUser = async(userData) => {
    const db = getDB();

    const result = await db.collection('Users').insertOne(userData);
    return result.insertedId;
}