const meilisearchUseCase = require("../use-cases/meilisearch.use-case");

class MeilisearchController {
  async heath(req, res) {
    const status = await meilisearchUseCase.health();

    res.json(status);
  }

  async getIndexes(req, res) {
    const { limit, offset } = req;

    const indexes = await meilisearchUseCase.getIndexes({ limit, offset });

    res.json(indexes);
  }

  async createIndex(req, res) {
    const { uid, primaryKey } = req.body;

    await meilisearchUseCase.createIndex({ uid, primaryKey });

    res.status(200).send();
  }

  async deleteIndex(req, res) {
    const { indexId } = req.params;

    await meilisearchUseCase.deleteIndex(indexId);

    res.status(200).send();
  }

  async getDocument(req, res) {
    const { documentId, indexId } = req.params;

    const document = await meilisearchUseCase.getDocument({
      indexId,
      documentId,
    });

    res.json(document);
  }

  async searchDocuments(req, res) {
    const { limit, offset } = req;
    const { indexId, key } = req.params;

    const documents = await meilisearchUseCase.searchDocuments({
      indexId,
      key,
      limit,
      offset,
    });

    res.json(documents);
  }

  async createDocument(req, res) {
    const { indexId } = req.params;
    const document = req.body;

    await meilisearchUseCase.createDocument({ indexId, document });

    res.status(200).send();
  }

  async updateDocument(req, res) {
    const { documentId, indexId } = req.params;

    const params = req.body;

    await meilisearchUseCase.updateDocument({ documentId, indexId, params });

    res.status(200).send();
  }

  async deleteDocument(req, res) {
    const { documentId, indexId } = req.params;

    await meilisearchUseCase.deleteDocument({ documentId, indexId });

    res.status(200).send();
  }

  async import(req, res) {
    const { file } = req;
    const { indexId } = req.params;

    await meilisearchUseCase.import({ indexId, file });

    res.status(200).send();
  }

  // async sync(req, res) {
  //   const { indexId } = req.params;

  //   await meilisearchUseCase.sync({ indexId });

  //   res.status(200).send();
  // }
}

module.exports = new MeilisearchController();
