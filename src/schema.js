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
    actor: ID
  }

  type MovieWithMoneyString {
    id: ID
    createdAt: Timestamp
    name: String
    genre: String
    country: String
    language: String
    money: String
    actor: ID
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
    movies: [MovieWithMoneyString]
    getMovie(id: ID, name: String, language: String, money: Float, actor: String): [MovieWithMoneyString]
    getAwards(id: ID): Awards
    users: [User]
    getUserByName(name: String): [User]
  }

  input userInput {
    id: ID
    name: String!
  }

  enum Genre {
    ACTION,
    ADVENTURE,
    DRAMA,
    COMEDY
  }

  enum Language {
    PORTUGUESE,
    ENGLISH,
    SPANISH
  }

  input movieInput {
    name: String
    genre: Genre
    country: String
    language: Language
    money: Float
    actor: String
  }

  type Mutation {
    createUser(data: userInput): User
    createMovie(data: movieInput): Movie
  }
`

module.exports = typeDefs