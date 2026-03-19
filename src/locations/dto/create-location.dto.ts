import { IsString, MaxLength, IsArray, ArrayNotEmpty, IsOptional, IsObject} from "class-validator";
import { Region } from "../../regions/entities/region.entity";

export class CreateLocationDto {
    @IsString()
    @MaxLength(35)
    locationName: string
    @IsString()
    @MaxLength(160)
    locationAddress: string
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[]
    @IsObject()
    @IsOptional()
    region: Region;

}
