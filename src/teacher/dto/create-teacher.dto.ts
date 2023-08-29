import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";


export class CreateTeacherDto {

    @IsString()
    teacher_id: string;

    @IsString()
    @MinLength(5)
    name: string;

    @IsEmail()
    teacher_email: string;

    @IsBoolean()
    active: boolean;
}
