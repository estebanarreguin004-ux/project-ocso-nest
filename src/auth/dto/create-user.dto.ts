import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @ApiProperty({ 
        default: 'user@example.com'
    })
    @IsEmail()
    userEmail: string

    @ApiProperty({
        default: 'password123'
    })
    @IsString()
    @MinLength(8)
    userPassword: string;

    @ApiProperty({
        default: ['Employee']
    })
    @IsOptional()
    @IsIn(['Employee', 'Manager', "Admin"])
    userRoles: string[];

}
