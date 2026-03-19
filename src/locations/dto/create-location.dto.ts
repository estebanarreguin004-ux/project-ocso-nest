import { IsString, MaxLength, IsArray, ArrayNotEmpty, IsOptional, IsObject} from "class-validator";
import { Region } from "../../regions/entities/region.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    @ApiProperty({
        default: 'Central Park'
    })
    @IsString()
    @MaxLength(35)
    locationName: string
    
    @ApiProperty({
        default: '123 Main St, New York, NY 10001'
    })
    @IsString()
    @MaxLength(160)
    locationAddress: string

    @ApiProperty({
        default: [40.1, -70.2]
    })
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[]
    
    @IsObject()
    @IsOptional()
    region: Region;

}
