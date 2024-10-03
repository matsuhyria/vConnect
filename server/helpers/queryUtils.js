const applyPagination = (query, page, limit) => {
    // Calculate the number of documents to skip based on the current page
    const skip = (page - 1) * limit;
    // Apply skip and limit to the query for pagination
    return query.skip(skip).limit(limit);
};

const applyDateFiltration = (query, date) => {
 
    if(!date) {
        return query.where('date').gte(new Date()); 
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return query.where('date').gte(startOfDay).lte(endOfDay);
};

module.exports = {
    applyPagination,
    applyDateFiltration,
};
