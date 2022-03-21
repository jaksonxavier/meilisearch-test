const filmsUseCase = require("../use-cases/films.use-case");

class FilmsController {
  async getFilms(req, res) {
    const { limit, offset } = req;

    const films = await filmsUseCase.getFilms({ limit, offset });

    return res.json(films);
  }

  async getFilmById(req, res) {
    const { limit, offset } = req;

    const { filmId } = req.params;

    const film = await filmsUseCase.getFilmById(filmId);

    return res.json(film);
  }

  async searchFilmsByTitle(req, res) {
    const { limit, offset } = req;

    const { title } = req.params;

    const result = await filmsUseCase.searchFilmsByTitle({
      title,
      limit,
      offset,
    });

    return res.json(result);
  }

  async create(req, res) {
    const params = req.body;

    await filmsUseCase.create(params);

    res.status(200).send();
  }

  async update(req, res) {
    const { filmId } = req.params;
    const params = req.body;

    await filmsUseCase.update({ id: filmId, params });

    res.status(200).send();
  }

  async delete(req, res) {
    const { filmId } = req.params;

    await filmsUseCase.delete(filmId);

    res.status(200).send();
  }
}

module.exports = new FilmsController();
