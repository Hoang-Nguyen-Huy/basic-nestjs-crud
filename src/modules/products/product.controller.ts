import { Body, Controller, Delete, Get, Param, Post, Put, Request, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseData } from "src/global/globalClass";
import { HttpStatus, HttpMessage } from "src/global/globalEnum";
import { ProductDto } from "src/dto/product.dto";
import { ProductEntity } from "src/entities/product.entity";
import { Roles } from "src/roles/role.decorator";
import { Role } from "src/roles/role.enum";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('products')
@Controller('products')
export class ProductController{

    constructor(private readonly productService: ProductService) {};

    @Get()
    async getProducts(): Promise<ResponseData<ProductEntity[]>> {
        try {
            return new ResponseData<ProductEntity[]>(await this.productService.getProducts(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity[]>(await this.productService.getProducts(), HttpStatus.ERROR, HttpMessage.ERROR);
        } 
    }

    @Post()
    @Roles(Role.Admin)
    async createProduct(@Body(new ValidationPipe()) productDto: ProductDto): Promise<ResponseData<ProductEntity>> {
        try {
            return new ResponseData<ProductEntity>(await this.productService.createProduct(productDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        } 
    }

    @Get('/:id')
    async detailProduct(@Param('id') id: string): Promise<ResponseData<ProductEntity>> {
        const checkProduct: ProductEntity = await this.productService.detailProduct(id);
        if (checkProduct) {
            return new ResponseData<ProductEntity>(checkProduct, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } else {
            return new ResponseData<ProductEntity>(checkProduct,404, 'Product Not Found');
        }
    }

    @Put('/:id')
    @Roles(Role.Admin)
    async updateProduct(@Body() productDto: ProductDto, @Param('id') id: string): Promise<ResponseData<string>> {
        try {
            return new ResponseData<string>(await this.productService.updateProduct(productDto, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        } 
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    async deleteProduct(@Param('id') id: string): Promise<ResponseData<string>> {
        const resultDelete = await this.productService.deleteProduct(id);
        if (resultDelete === "Delete failed") {
            return new ResponseData<string>(resultDelete, 404, 'Product Not Found');
        } else {
            return new ResponseData<string>(resultDelete, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        }
    }
};
