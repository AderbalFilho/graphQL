const { models } = require('./db');

module.exports = {
  Query: {
    movies: () => models.Movie.findAll(),
    getMovie: (_, args) => models.Movie.findOne(args),
    getAwards: (_, args) => {
      let result = models.Movie.findAwards(args);

      if (!result.length) {
        result = [{
          idMovie: args.id,
          oscar: 0
        }];
      }

      return result[0];
    },
    users: () => models.User.findAll(),
    getUserByName: (_, args) => models.User.findOne(args)
  },
  Mutation: {
    createUser: (_, { data }) => models.User.create(data)
  }
}
