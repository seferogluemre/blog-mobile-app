// Types
export interface CreatePostBody {
    title: string;
    content: string;
    category_id?: number | null
    user_id: number;
}

export interface UpdatePostBody {
    title?: string;
    content?: string;
    category_id?: number
}

export interface PostQueryProps {
    category?: string;
    status?: string;
    draft?: string;
    all?: string;
    showDeleted?: string;
    onlyDeleted?: string;
    tag_id: number;
}

export interface WhereConditionProps {
    category_id?: number;
    tag_id?: number;
    status?: string;
    draft?: boolean;
    published_at?: { not: null } | { equals: null };
    deleted_at?: { not: null } | null;
    post_tags?: {
        some: {
            tag_id: number;
        };
    };
}