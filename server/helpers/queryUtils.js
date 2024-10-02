const applyPagination = (query, page, limit) => {
    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;
    // Apply skip and limit to the query for pagination
    return query.skip(skip).limit(limit);
};

module.exports = {
    applyPagination,
};
