export interface CreateUserBody {
    name: string;
    username: string;
    password: string;
}

export interface UpdateUserBody {
    name?: string;
    username?: string;
    password?: string;
}