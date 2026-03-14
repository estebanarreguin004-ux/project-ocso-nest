import { Provider } from "@nestjs/common";
import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import { Product } from "../entities/product.entity";

export class CreateProductDto {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsString()
    @IsUUID("4")
    provider: string;
}
