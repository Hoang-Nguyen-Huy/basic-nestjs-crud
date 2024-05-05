import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    categoryId?: number;

    @MinLength(5)
    productName?: string;

    @IsNumber()
    price?: number;
}