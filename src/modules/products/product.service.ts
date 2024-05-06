import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "src/dto/product.dto";
import { ProductEntity } from "src/entities/product.entity";
import { Product } from "src/models/product.model";
import { Repository } from "typeorm";

@Injectable()
export class ProductService{

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) {};

    private products: Product[] = [
        {id: 1, categoryId: 2, price: 8000, productName: "Iphone"},
        {id: 2, categoryId: 3, price: 9000, productName: "Samsung"},
        {id: 3, categoryId: 4, price: 10000, productName: "Nokia"},
    ]

    getProducts(): Promise<ProductEntity[]> {
        return this.productRepository.find();
    }
 
    createProduct(productDto: ProductDto): Product {
        const product: Product = {
            id: Math.random(),
            ...productDto
        };
        this.products.push(product);
        return productDto;
    }

    detailProduct(id: number): Product {
        return this.products.find(item => item.id === Number(id));
    }

    updateProduct(productDto: ProductDto, id: number): Product {
        const index = this.products.findIndex(item => item.id === Number(id));
        this.products[index].categoryId = productDto.categoryId;
        this.products[index].productName = productDto.productName;
        this.products[index].price = productDto.price;
        return this.products[index];
    }

    deleteProduct(id: number): boolean {
        const index = this.products.findIndex(item => item.id === Number(id));
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }

}; 