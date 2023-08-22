const { BlogDetail } = require('./models/BlogSchema');
const { UserDetail } = require('./models/UserSchema');
const jwt = require('jsonwebtoken')

const Resolvers = {
    Query: {
        blogs: async () => {
            const response = BlogDetail.find({})
            return response
        },
        users: async () => {
            const response = UserDetail.find({})
            return response
        }
    },
    Mutation: {
        authenticUser: async (parent, args, contextvalue) => {
            if (contextvalue.token !== null || contextvalue.token !== undefined) {
                const { id } = jwt.decode(contextvalue.token, 'boyz')
                const responseUser = await UserDetail.findById(id)
                return responseUser
            }
        },
        createBlog: async (parent, args) => {
            const newBlog = new BlogDetail({
                Title: args.Title,
                Description: args.Description,
                img: args.img,
                UserID: args.UserId
            });
            await newBlog.save();
            return newBlog;
        },
        updateBlog: async (parent, args) => {
            const { id } = args
            const updatedBlog = await BlogDetail.findByIdAndUpdate({ _id: id }, args)
            return updatedBlog
        },
        deleteBlog: async (parent, args) => {
            const { id } = args
            const response = await BlogDetail.findByIdAndDelete({ _id: id })
            return response
        }
    },
};

module.exports = { Resolvers }