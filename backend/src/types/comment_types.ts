import { Prisma } from "@prisma/client";

export interface CreateCommentBody {
    content: string;
    commenter_name: string;
    post_id: number;
    user_id: number;
}

export interface UpdateCommentBody {
    content: string;
    commenter_name: string;
    post_id: number;
}

export type WhereCondition = Prisma.PostCommentWhereInput;

export interface CommentQueryProps {
    post: number;
    commenter_name: string;
}