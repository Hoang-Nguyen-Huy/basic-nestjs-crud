import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseData } from "src/global/globalClass";
import { HttpStatus, HttpMessage } from "src/global/globalEnum";
import { Product } from "src/models/product.model";
import { ProductDto } from "src/dto/product.dto";
import { ProductEntity } from "src/entities/product.entity";

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
    async createProduct(@Body(new ValidationPipe()) productDto: ProductDto): Promise<ResponseData<ProductEntity>> {
        try {
            return new ResponseData<ProductEntity>(await this.productService.createProduct(productDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        } 
    }

    @Get('/:id')
    async detailProduct(@Param('id') id: string): Promise<ResponseData<ProductEntity>> {
        try {
            return new ResponseData<ProductEntity>(await this.productService.detailProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductEntity>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        } 
    }

    @Put('/:id')
    updateProduct(@Body() productDto: ProductDto, @Param('id') id: number): ResponseData<Product> {
        try {
            return new ResponseData<Product>(this.productService.updateProduct(productDto, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        } 
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string): Promise<ResponseData<string>> {
        try {
            return new ResponseData<string>(await this.productService.deleteProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        } 
    }
};
