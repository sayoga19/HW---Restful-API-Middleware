const  { movies }  = require("../models");

class MovieController {
  static async getAll(req, res, next) {
    try {
      const allMovies = await movies.findAll({ limit: req.query.limit });
      res.status(200).json(allMovies);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await movies.findByPk(id);
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).send("Movie not found");
      }
    } catch (error) {
      next(error);
    }
  }

  static async createMovie(req, res, next) {
    try {
      const { id, title, genres, year } = req.body;
      const newMovie = await movies.create({ id, title, genres, year });
      res
        .status(201)
        .json({ status: "success", message: "Movie created successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { title, genres, year } = req.body;
      const updateMovies = await movies.update(
        { title, genres, year },
        { where: { id } }
      );
      res
        .status(201)
        .json({ status: "success", message: "Movie updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      await movies.destroy({ where: { id } });
      res
        .status(201)
        .json({ status: "success", message: "Movie deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
