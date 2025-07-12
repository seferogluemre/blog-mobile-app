export interface CreateCategoryBody {
    name: string;
}
export interface UpdateCategoryBody {
    name: string;
}

export interface CategoryQueryProps {
    showDeleted?: string;
    onlyDeleted?: string;
}