const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Timestamp

  type Movie {
    id: ID
    createdAt: Timestamp
    name: String
    genre: String
    country: String
    language: String
    money: Float
  }

  type User {
    id: ID!
    name: String
  }

  type Awards {
    idMovie: ID
    oscar: Int
  }

  type Query {
    movies: [Movie]
    getMovie(name: String, language: String, money: Float): [Movie]
    getAwards(id: ID): Awards
    users: [User]
    getUserByName(name: String): [User]
  }

  input userInput {
    id: ID
    name: String!
  }

  type Mutation {
    createUser(data: userInput): User
  }
`

module.exports = typeDefs