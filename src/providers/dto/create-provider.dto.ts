import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProviderDto {
    @ApiProperty({
        default: 'Coca-Cola'
    })
    @IsString()
    @MaxLength(100)
    providerName: string;

    @ApiProperty({
        default: 'example@coca-cola.com'
    })
    @IsEmail()
    @IsString()
    providerEmail: string

    @ApiProperty({
        default: '1234567890'
    })
    @IsString()
    @MaxLength(15)
    @IsOptional()
    phoneNumber: string;

}
