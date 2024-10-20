function normalizeData(items) {
    return items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        genre: item.genre,
        year: item.year
    }));
}

module.exports = {
    normalizeData
};
