import { IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
}