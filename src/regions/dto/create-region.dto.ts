import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, MaxLength } from "class-validator";


export class CreateRegionDto {
    @ApiProperty({
        default: 'Norte'
    })
    @IsString()
    @MaxLength(100)
    regionName: string;

    @ApiProperty({
        default: ['Sonora', 'Chihuahua', 'Sinaloa']
    })
    @IsArray()
    regionStates: string[];
}
