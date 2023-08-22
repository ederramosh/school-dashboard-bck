import { IsEmail, IsString, MinLength, IsBoolean } from 'class-validator';

export class CreateAuthDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;
    
    @IsString()
    @MinLength(3)
    fullname: string;
    
    @IsBoolean()
    isActive: boolean;
    
    @IsString()
    rol: string;

}
