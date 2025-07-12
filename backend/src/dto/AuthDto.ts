import { UserRole } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegisterDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    username!: string;


    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    role!: UserRole;
}