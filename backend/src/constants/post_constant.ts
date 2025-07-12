import { PostQueryProps, WhereConditionProps } from "src/types/post_types";

export const POST_WHERE_CLAUSE = (query: PostQueryProps): WhereConditionProps => {
    const whereConditions: WhereConditionProps = {};

    if (query.category) {
        whereConditions.category_id = Number(query.category);
    }

    if (query.tag_id) {
        whereConditions.post_tags = {
            some: {
                tag_id: Number(query.tag_id)
            }
        };
    }

    if (query.status === "published") {
        whereConditions.published_at = { not: null };
    } else if (query.draft === "true") {
        whereConditions.published_at = { equals: null };
    }

    if (query.showDeleted === 'true') {
        // Handle showDeleted condition if needed
    } else if (query.onlyDeleted === 'true') {
        whereConditions.deleted_at = { not: null };
    } else {
        whereConditions.deleted_at = null;
    }

    return whereConditions;
}