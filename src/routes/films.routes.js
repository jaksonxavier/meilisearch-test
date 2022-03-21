const { Router } = require("express");

const filmsController = require("../controllers/films.controller");
const { paginatedParams } = require("../middlewares/paginate.middleware");
const {
  validateRequiredFieldsHaveBeenSent,
  removeInvalidReceivedFields,
} = require("../middlewares/films.middleware");

const filmsRoutes = Router();

filmsRoutes.get("/", paginatedParams, filmsController.getFilms);

filmsRoutes.get("/:filmId", paginatedParams, filmsController.getFilmById);

filmsRoutes.get(
  "/search/:title",
  paginatedParams,
  filmsController.searchFilmsByTitle
);

filmsRoutes.post(
  "/",
  validateRequiredFieldsHaveBeenSent,
  filmsController.create
);

filmsRoutes.put(
  "/:filmId",
  removeInvalidReceivedFields,
  filmsController.update
);

filmsRoutes.delete("/:filmId", filmsController.delete);

module.exports = filmsRoutes;
