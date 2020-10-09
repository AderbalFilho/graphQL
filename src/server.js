const { ApolloServer } = require('apollo-server')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { models, db } = require('./db')

const server = new ApolloServer()

server.listen()
  .then(({ url }) => console.log(`Listen on ${url}`))