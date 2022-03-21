module.exports = {
  paginatedParams(req, res, next) {
    let { limit, offset } = req.query;

    limit = Number(limit) || 20;
    offset = Number(offset) || 0;

    Object.assign(req, {
      limit,
      offset,
    });

    next();
  },
};
