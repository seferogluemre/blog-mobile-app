export interface CreatePostTagBody {
    post_id: number;
    tag_id: number;
}

export interface CreateTagBody {
    name: string
}

export interface UpdateTagBody {
    name: string
}