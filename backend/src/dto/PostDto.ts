import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;


    @IsNumber()
    category_id?: number

    @IsNotEmpty()
    @IsNumber()
    user_id!: number
}

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;


    @IsOptional()
    category_id?: number
}