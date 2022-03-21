const { Router } = require("express");

const filmsRoutes = require("./films.routes");
const meilisearchRoutes = require("./meilisearch.routes");

const router = Router();

router.use("/films", filmsRoutes);
router.use("/meilisearch", meilisearchRoutes);

module.exports = router;
