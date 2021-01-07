const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_URI } = require('./config.js');
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server running at localhost:5000`);
    });