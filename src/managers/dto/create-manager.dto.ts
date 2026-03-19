import { IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../../locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManagerDto {
    @ApiProperty({
        default: 'Juan Pérez'
    })
    @IsString()
    @MaxLength(80)
    managerFullName: string;

    @ApiProperty({
        default: 50000
    })
    @IsNumber()
    managerSalary: number
    
    @ApiProperty({
        default: 'juan.perez@example.com'
    })
    @IsString()
    managerEmail: string;

    @ApiProperty({
        default: '1234567890'
    })
    @IsString()
    @MaxLength(15)
    managerPhoneNumber: string;
    
    @IsObject()
    @IsOptional()
    location: Location;

}
