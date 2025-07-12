export const CATEGORY_FILTERS = {
    SHOW_DELETED: "showDeleted",
    ONLY_DELETED: "onlyDeleted",
};

export const CATEGORY_WHERE_CLAUSE = (query: Record<string, any>) => {
    const { showDeleted, onlyDeleted } = query;

    if (onlyDeleted === "true") {
        return {
            deleted_at: { not: null }
        };
    }

    return {
        deleted_at: showDeleted === "true" ? undefined : null
    };
};
