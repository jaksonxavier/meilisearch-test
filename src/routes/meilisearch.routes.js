const { Router } = require("express");

const multer = require("multer");

const meilisearchController = require("../controllers/meilisearch.controller");

const { paginatedParams } = require("../middlewares/paginate.middleware");

const uploadConfig = require("../multer.config");

const {
  validateRequiredFieldsHaveBeenSent,
} = require("../middlewares/meilisearch.middleware");

const meilisearchRoutes = Router();

const uploadFile = multer(uploadConfig);

meilisearchRoutes.get("/health", meilisearchController.heath);
meilisearchRoutes.get(
  "/indexes",
  paginatedParams,
  meilisearchController.getIndexes
);
meilisearchRoutes.post(
  "/indexes",
  validateRequiredFieldsHaveBeenSent,
  meilisearchController.createIndex
);
meilisearchRoutes.delete(
  "/indexes/:indexId",
  meilisearchController.deleteIndex
);
// meilisearchRoutes.put("/sync/:indexId", meilisearchController.sync);
meilisearchRoutes.get(
  "/indexes/:indexId/documents/:documentId",
  meilisearchController.getDocument
);
meilisearchRoutes.get(
  "/indexes/:indexId/documents/search/:key",
  paginatedParams,
  meilisearchController.searchDocuments
);
meilisearchRoutes.post(
  "/indexes/:indexId/documents",
  meilisearchController.createDocument
);
meilisearchRoutes.put(
  "/indexes/:indexId/documents/:documentId",
  meilisearchController.updateDocument
);
meilisearchRoutes.delete(
  "/indexes/:indexId/documents/:documentId",
  meilisearchController.deleteDocument
);
meilisearchRoutes.post(
  "/indexes/:indexId/documents/import",
  uploadFile.single("file"),
  meilisearchController.import
);

module.exports = meilisearchRoutes;
