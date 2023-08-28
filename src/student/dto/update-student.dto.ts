import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class UpdateStudentDto {

    @IsString()
    @MinLength(5)
    name?: string;

    @IsEmail()
    email?: string;

    @IsBoolean()
    active?: boolean;

}
