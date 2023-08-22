const TypeDefs = `
  type Blog {
    id: String
    Title: String,
    Description: String,
    UserID: String
    img: String,
  }

  type User {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String
  }

  type Query {
    blogs: [Blog!]!
    users : [User!]!
  }

  type Mutation {
    createBlog(
      Title: String, 
      Description: String, 
      img: String, 
      UserId: String
      ): Blog

    updateBlog(
      id: String,
      Title: String, 
      Description: String, 
      img: String, 
      UserId: String
      ): Blog

    deleteBlog(
      id : String
    ) : Blog  

    authenticUser(
      email : String
      password : String
    ) : User
  }



`;

module.exports = { TypeDefs }
