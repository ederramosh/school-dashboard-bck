import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";
export class UpdateTeacherDto {

    @IsString()
    @MinLength(5)
    name?: string;

    @IsEmail()
    teacher_email?: string;

    @IsBoolean()
    active?: boolean;

}
