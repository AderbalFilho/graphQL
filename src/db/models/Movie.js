const { ApolloError } = require('apollo-server-errors');
const { uuid } = require('uuidv4');
const userModel = require('./User');

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
      const actor = userModel(db).findOne({ name: movie.actor });
      movie.actor = actor.id;

      const newMovie = { id: uuid(), createdAt: Date.now(), ...movie }
      const data = db.get('movie').filter(movie).value()
      if (!data.length) db.get('movie').push(newMovie).write()
      else return new ApolloError("This movie already exists. Try other name!")
      return newMovie
    }
  }
}

module.exports = movieModel