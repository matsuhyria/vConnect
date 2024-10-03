const applyPagination = (query, page, limit) => {
    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;
    // Apply skip and limit to the query for pagination
    return query.skip(skip).limit(limit);
};

const applyDateFiltration = (query, date) => {
    if (date) {
        query = query.where('date').equals(new Date(date));
    }
    return query;
};

module.exports = {
    applyPagination,
    applyDateFiltration,
};
