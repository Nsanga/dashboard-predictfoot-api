function paginate(array, page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = array.slice(startIndex, endIndex);

  return {
    page: page,
    limit: limit,
    totalItems: array.length,
    totalPages: Math.ceil(array.length / limit),
    results: results
  };
}

module.exports = paginate;