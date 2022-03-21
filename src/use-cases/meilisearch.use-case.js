const { parse } = require("csv-parse");
const fs = require("fs");

const {
  IndexNotFoundError,
  DocumentNotFoundError,
} = require("../errors/meilisearch.error");
// const { CSVError } = require("../errors/csv.error");

const meilisearchService = require("../meilisearch.service");

class MeilisearchUseCase {
  #meilisearchService;

  constructor() {
    this.#meilisearchService = meilisearchService;
  }

  async health() {
    const status = await this.#meilisearchService.health();

    return status;
  }

  async getIndexes({ limit, offset }) {
    const result = await this.#meilisearchService.getIndexes({
      limit,
      offset,
    });

    result.data.map((index) => {
      delete index["httpRequest"];
      delete index["tasks"];
    });

    return result;
  }

  async createIndex({ uid, primaryKey }) {
    await this.#meilisearchService.createIndex({ uid, primaryKey });

    return;
  }

  async deleteIndex(id) {
    await this.#meilisearchService.deleteIndex(id);

    return;
  }

  async getDocument({ indexId, documentId }) {
    const index = await this.#meilisearchService.getIndex(indexId);

    if (!index) {
      throw new IndexNotFoundError(indexId);
    }

    const document = await this.#meilisearchService.getDocument({
      indexId,
      documentId,
    });

    if (!document) {
      throw new DocumentNotFoundError({ indexId, documentId });
    }

    return document;
  }

  async createDocument({ indexId, document }) {
    const index = await this.#meilisearchService.getIndex(indexId);

    if (!index) {
      throw new IndexNotFoundError(indexId);
    }

    await this.#meilisearchService.addDocuments({
      indexId,
      documents: [document],
    });

    return;
  }

  async updateDocument({ indexId, documentId, params }) {
    const index = await this.#meilisearchService.getIndex(indexId);

    if (!index) {
      throw new IndexNotFoundError(indexId);
    }

    // const document = await this.#meilisearchService.getDocument({
    //   indexId,
    //   documentId,
    // });

    // if (!document) {
    //   throw new DocumentNotFoundError({ indexId, documentId });
    // }

    await this.#meilisearchService.updateDocuments({
      indexId,
      documents: [params],
    });

    return;
  }

  async deleteDocument({ indexId, documentId }) {
    const index = await this.#meilisearchService.getIndex(indexId);

    if (!index) {
      throw new IndexNotFoundError(indexId);
    }

    await this.#meilisearchService.deleteDocument({
      indexId,
      documentId,
    });

    return;
  }

  async searchDocuments({ indexId, key, limit, offset }) {
    const index = await this.#meilisearchService.getIndex(indexId);

    if (!index) {
      throw new IndexNotFoundError(indexId);
    }

    const documents = await this.#meilisearchService.searchDocuments({
      indexId,
      key,
      limit,
      offset,
    });

    return documents;
  }

  #load(file) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const films = [];

      const parseFile = parse(
        {
          columns: [
            "id",
            "exhibition_year",
            "title",
            "genre",
            "nationality",
            "distribution_company",
            "origin_distributor_company",
            "public_exhibition_year",
            "invoicing_exhibition_year",
          ],
          ltrim: true,
          rtrim: true,
        }
        // function (error, records) {
        //   if (error) {
        //     Object.assign(error, {
        //       timestamp: new Date(),
        //     });
        //     console.log(JSON.stringify(error));
        //     throw new CSVError(error.code);
        //   }
        // }
      );

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          films.push(line);
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(films);
        })
        .on("error", (error) => {
          fs.promises.unlink(file.path);
          reject(error);
        });
    });
  }

  async import({ indexId, file }) {
    const films = await this.#load(file);

    films.shift(); // remove description columns

    await Promise.all([
      this.#meilisearchService.createIndex({ uid: indexId, primaryKey: "id" }),
      this.#meilisearchService.addDocuments({
        indexId,
        documents: films,
      }),
    ]);

    return;
  }

  // async sync({ indexId }) {
  //   const index = await this.#meilisearchService.getIndex(indexId);

  //   if (!index) {
  //     throw new IndexNotFoundError(indexId);
  //   }

  //   await this.#meilisearchService.addDocuments({ indexId, documents: films });

  //   return;
  // }
}

module.exports = new MeilisearchUseCase();
