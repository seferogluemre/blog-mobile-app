import { UserRole } from "@prisma/client";

export interface CreateRegisterBody {
    name: string;
    username: string;
    password: string;
    role: UserRole;
}

export interface LoginBody {
    username: string;
    password: string
}