import { IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Location } from "../../locations/entities/location.entity";

export class CreateManagerDto {
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsNumber()
    managerSalary: number
    @IsString()
    managerEmail: string;
    @IsString()
    @MaxLength(15)
    managerPhoneNumber: string;
    @IsObject()
    @IsOptional()
    location: Location;

}
