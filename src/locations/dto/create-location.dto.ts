import { IsString, MaxLength, IsArray, ArrayNotEmpty, IsOptional, IsNumber, IsUUID} from "class-validator";
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
    
    @ApiProperty({
        description: 'ID de la Región a la que pertenece',
        default: 1
    })
    @IsNumber()
    @IsOptional()
    regionId: number;

    @ApiProperty({
        description: 'ID del Manager asignado',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID() 
    @IsOptional()
    managerId: string;

}
