import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CreateStudentDto {

    @IsString()
    student_id: string;

    @IsString()
    @MinLength(5)
    name: string;

    @IsEmail()
    email: string;

    @IsBoolean()
    active: boolean;

}
