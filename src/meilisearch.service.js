const { MeiliSearch } = require("meilisearch");

const client = new MeiliSearch({
  host: "http://127.0.0.1:7700",
  apiKey: "masterKey",
});

class MeilisearchService {
  async health() {
    const status = await client.health();

    return status;
  }

  async getIndex(id) {
    const index = client
      .index(id)
      .getRawInfo()
      .then(({ uid, name, primaryKey }) => {
        return {
          uid,
          name,
          primaryKey,
        };
      })
      .catch((error) => {
        Object.assign(error, {
          indexId: id,
          timestamp: new Date(),
        });
        console.log(JSON.stringify(error));
      });

    return index;
  }

  async getIndexes({ limit, offset }) {
    const indexes = await client.getIndexes();

    return {
      data: indexes.slice(offset, offset + limit),
      totalCount: indexes.length,
    };
  }

  async createIndex({ uid, primaryKey }) {
    const index = await client.createIndex(uid, { primaryKey });

    return index;
  }

  async deleteIndex(id) {
    await client.deleteIndex(id);

    return;
  }

  async getDocument({ indexId, documentId }) {
    const document = client
      .index(indexId)
      .getDocument(documentId)
      .then((_document) => {
        return _document;
      })
      .catch((error) => {
        Object.assign(error, {
          indexId,
          documentId,
          timestamp: new Date(),
        });
        console.log(JSON.stringify(error));
      });

    return document;
  }

  async addDocuments({ indexId, documents }) {
    const index = client.index(indexId);

    await index.addDocuments(documents);

    return;
  }

  async searchDocuments({ indexId, key, limit, offset }) {
    const index = client.index(indexId);

    const { hits, nbHits } = await index.search(key, { limit, offset });

    return {
      data: hits,
      totalCount: nbHits,
    };
  }

  async updateDocuments({ indexId, documents }) {
    const index = client.index(indexId);

    await index.updateDocuments(documents);

    return;
  }

  async deleteDocument({ indexId, documentId }) {
    await client.index(indexId).deleteDocument(documentId);

    return;
  }

  async deleteAllDocuments(indexId) {
    await client.index(indexId).deleteAllDocuments();

    return;
  }
}

module.exports = new MeilisearchService();
