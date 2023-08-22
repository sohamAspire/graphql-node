const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const User = new mongoose.Schema({
    _id: ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String
});

const UserDetail = mongoose.model("users", User)

module.exports = { UserDetail };