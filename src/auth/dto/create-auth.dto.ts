import { IsEmail, IsString, MinLength, Matches, MaxLength, IsBoolean } from 'class-validator';

export class CreateAuthDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    } )
    password: string;
    
    @IsString()
    @MinLength(3)
    fullname: string;
    
    @IsBoolean()
    isActive: boolean;
    
    @IsString()
    rol: string;

}
