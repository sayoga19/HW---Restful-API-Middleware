const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const MovieController = require("../controller/movie-controller");

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     responses:
 *       200:
 *         description: A list of movies.
 */

router.get("/", MovieController.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Retrieve a movie by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The movie ID.
 *     responses:
 *       200:
 *         description: A movie.
 */

router.get("/:id", MovieController.getById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genres:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The movie was created.
 */

router.post("/", auth, MovieController.createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The movie ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The movie was updated.
 */

router.put("/:id", auth, MovieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The movie ID.
 *     responses:
 *       201:
 *         description: The movie was deleted.
 */

router.delete("/:id", auth, MovieController.deleteMovie);

module.exports = router;
