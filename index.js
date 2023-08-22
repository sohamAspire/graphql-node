const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// const { ApolloServer, gql } = require('apollo-server-express');
const { TypeDefs } = require('./TypeDefs');
const { Resolvers } = require('./Resolvers');
const mongoose = require("mongoose");
const { GraphQLError } = require('graphql');

mongoose.connect(`mongodb+srv://sohampatel:Rock1812002@cluster01.jjixm3r.mongodb.net/BlogSite`).then((res) => {
    console.log("SuccessFully Connected");
});

const server = new ApolloServer({
    typeDefs: TypeDefs,
    resolvers: Resolvers,
});

startStandaloneServer(server, {
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        if (!token || token === '') {
            throw new GraphQLError('User is not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: { status: 401 },
                },
            });
        }
        else {
            return { token: token }
        }
    },
    listen: { port: 4000 },
}).then((res) => {
    console.log(`🚀  Server ready at ${res.url}graphql`);
});

// const app = express();
// server.start().then(res => {
//     server.applyMiddleware({ app, path: '/graphql' });
//     app.listen({ port: 4000 }, () =>
//         console.log(`server is listening at http://localhost:${4000}${server.graphqlPath}`)
//     )
// })