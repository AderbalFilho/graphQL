const { ApolloError } = require('apollo-server-errors');
const { uuid } = require('uuidv4')

const movieModel = db => {
  return {
    findOne(filter) {
      return db.get('movie')
        .filter(filter)
        .value()
    },

    findAll() {
      return db.get('movie')
        .value()
    },

    findAwards({ id }) {
      return db.get('awards')
        .filter({ idMovie: id })
        .value()
    },

    create(movie) {
      const newMovie = { id: uuid(), createdAt: Date.now(), ...movie }
      const data = db.get('movie').filter(movie).value()
      if (!data.length) db.get('movie').push(newMovie).write()
      else return new ApolloError("This movie already exists. Try other name!")
      return newMovie
    }
  }
}

module.exports = movieModel