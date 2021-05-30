module.exports.paginate = (array, page, limit) =>
  array.slice((page - 1) * limit, page * limit);
