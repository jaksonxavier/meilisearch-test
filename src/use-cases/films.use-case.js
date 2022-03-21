const { FilmNotFoundError } = require("../errors/films.error");
const knexFilmsRepository = require("../knex-films.repository");

class FilmsUseCase {
  #filmsRepository;

  constructor() {
    this.#filmsRepository = knexFilmsRepository;
  }

  async getFilms({ limit, offset }) {
    const films = await this.#filmsRepository.findMany({ limit, offset });

    return films;
  }

  async getFilmById(id) {
    const film = await this.#filmsRepository.findById(id);

    if (!film) {
      throw new FilmNotFoundError(id);
    }

    return film;
  }

  async searchFilmsByTitle({ title, limit, offset }) {
    const result = await this.#filmsRepository.findByTitle({
      title,
      limit,
      offset,
    });

    return result;
  }

  async create(params) {
    await this.#filmsRepository.create(params);

    return;
  }

  async update({ id, params }) {
    const film = await this.#filmsRepository.findById(id);

    if (!film) {
      throw new FilmNotFoundError(id);
    }

    await this.#filmsRepository.save({ id, params });

    return;
  }

  async delete(id) {
    await this.#filmsRepository.deleteById(id);

    return;
  }
}

module.exports = new FilmsUseCase();
