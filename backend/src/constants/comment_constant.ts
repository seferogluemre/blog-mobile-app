import { CommentQueryProps, WhereCondition } from "src/types/comment_types";

export const COMMENT_WHERE_CLAUSE = (query: CommentQueryProps): WhereCondition => {
    const whereCondition: WhereCondition = {};

    if (query.post) {
        whereCondition.post_id = query.post;
    }

    if (query.commenter_name) {
        whereCondition.commenter_name = {
            contains: query.commenter_name,
        };
    }

    return whereCondition;
};
