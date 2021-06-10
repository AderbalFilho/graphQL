const { models } = require('./db');

module.exports = {
  Query: {
    movies: () => models.Movie.findAll(),
    getMovie: (_, args) => {
      let actor;

      if (args.actor) {
        actor = models.User.findOne({ name: args.actor })[0];
        args.actor = actor.id;
      }

      const movie = models.Movie.findOne(args);
      actor = models.User.findOne({ id: movie[0].actor })[0];

      movie[0].actor = actor.name;
      return movie;
    },
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
    createUser: (_, { data }) => models.User.create(data),
    createMovie: (_, { data }) => models.Movie.create(data)
  }
}
