import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    @IsNumber()
    categoryId?: number;

    @MinLength(5)
    productName?: string;

    @IsNumber()
    price?: number;
}