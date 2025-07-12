import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostTagDto {
    @IsNotEmpty()
    @IsNumber()
    post_id!: number


    @IsNotEmpty()
    @IsNumber()
    tag_id!: number
}