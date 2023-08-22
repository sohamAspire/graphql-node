const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const Blog = new mongoose.Schema({
    _id: ObjectId,
    Title: String,
    Description: String,
    UserID: {
        type: String,
        ref: "users"
    },
    img: String,
});

const BlogDetail = mongoose.model("blogs", Blog);

module.exports = { BlogDetail };