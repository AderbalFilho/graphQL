const { models } = require('./db');

module.exports = {
  Query: {
    movies: () => {
      let movies = models.Movie.findAll();

      movies = movies.map((movie) => {
        if (movie.language) {
          switch(movie.language.toUpperCase()) {
            case "PORTUGUESE":
              movie.language = "Português";
              break;
            case "ENGLISH":
              movie.language = "Inglês";
              break;
            case "SPANISH":
              movie.language = "Espanhol";
              break;
          }
        }

        if (movie.money) {
          movie.money = movie.money.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
          });
        }

        return movie;
      });

      return movies;
    },
    getMovie: (_, args) => {
      let actor;

      if (args.actor) {
        actor = models.User.findOne({ name: args.actor })[0];
        args.actor = actor.id;
      }

      const movie = models.Movie.findOne(args);
      actor = models.User.findOne({ id: movie[0].actor })[0];

      movie[0].actor = actor.name;

      if (movie[0].language) {
        switch(movie[0].language.toUpperCase()) {
          case "PORTUGUESE":
            movie[0].language = "Português";
            break;
          case "ENGLISH":
            movie[0].language = "Inglês";
            break;
          case "SPANISH":
            movie[0].language = "Espanhol";
            break;
        }
      }

      if (movie[0].money) {
        movie[0].money = movie[0].money.toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL'
        });
      }

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
