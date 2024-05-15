import { ApiProperty } from "@nestjs/swagger";
import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class ProductDto {
    @ApiProperty({
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    categoryId?: number;

    @ApiProperty({
        example: 'Iphone',
    })
    @MinLength(5)
    productName?: string;

    @ApiProperty({
        example: 200,
    })
    @IsNumber()
    price?: number;
}