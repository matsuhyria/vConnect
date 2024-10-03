const applyPagination = (query, page, limit) => {
    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;
    // Apply skip and limit to the query for pagination
    return query.skip(skip).limit(limit);
};

const applyDateFiltration = (query, date) => {

    const filtDate = date ? new Date(date) : new Date();

    const startOfDay = new Date(filtDate);
    const endOfDay = new Date(filtDate);

    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    return query = query.where('date').gte(startOfDay).lte(endOfDay);
};

module.exports = {
    applyPagination,
    applyDateFiltration,
};
