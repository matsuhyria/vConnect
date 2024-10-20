const applyPagination = (query, page, limit) => {
    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;
    // Apply skip and limit to the query for pagination
    return query.skip(skip).limit(limit);
};

const applyDateFiltration = (query, date) => {
    const today = new Date().setHours(0, 0, 0, 0);

    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    if (startOfDay < today) {
        return query.where('date').gte(today);
    } 

    return query.where('date').gte(startOfDay).lte(endOfDay);
};

module.exports = {
    applyPagination,
    applyDateFiltration,
};
