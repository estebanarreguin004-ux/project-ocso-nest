import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../../locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto {
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    employeeName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(70)
    employeeLastName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    employeeEmail: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    location: Location;
}
