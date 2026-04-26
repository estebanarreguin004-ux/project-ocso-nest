import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "../../providers/entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    productId?: string;

    @ApiProperty({
        default: 'Coca-Cola'
    })
    @IsString()
    @MaxLength(40)
    productName!: string;

    @ApiProperty({
        default: 10.5
    })
    @IsNumber()
    price!: number;

    @ApiProperty({
        default: 2
    })
    @IsInt()
    countSeal!: number;

    @IsString()
    @IsOptional()
    provider?: string;
}
