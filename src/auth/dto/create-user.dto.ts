import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsEmail()
    userEmail: string
    @IsString()
    @MinLength(8)
    userPassword: string;
    @IsOptional()
    @IsIn(['Employee', 'Manager', "Admin"])
    userRoles: string[];

}
