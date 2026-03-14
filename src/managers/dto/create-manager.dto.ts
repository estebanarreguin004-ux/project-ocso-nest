import { IsNumber, IsString, MaxLength } from "class-validator";

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

}
