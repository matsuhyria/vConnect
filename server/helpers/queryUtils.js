const getPaginationParams = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page <= 0 || limit <= 0) {
        throw new Error("Invalid page or limit parameter. It must be a positive integer.");
    }

    return { page, limit };
};

const applyPagination = (query, page, limit) => {
    const skip = (page - 1) * limit;
    return query.skip(skip).limit(limit);
};

module.exports = {
    getPaginationParams, 
    applyPagination,
};
