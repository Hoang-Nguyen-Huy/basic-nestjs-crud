import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDto } from "src/dto/product.dto";
import { ProductEntity } from "src/entities/product.entity";
import { Product } from "src/models/product.model";
import { Repository, UpdateResult } from "typeorm";

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
 
    createProduct(productDto: ProductDto): Promise<ProductEntity> {
        return this.productRepository.save(productDto);
    }

    detailProduct(id: string): Promise<ProductEntity | null> {
        return this.productRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    async updateProduct(productDto: ProductDto, id: string): Promise<string> {
        const productUp = await this.productRepository.findOne({
            where: {
                id: id,
            }
        });
        if (productUp) {
            const res = (await this.productRepository.update(id, productDto)).affected;
            if (res === 0) {
                return 'Update failed';
            } else {
                return 'Update successfully';
            }
        }
        return 'Product not found';
    }

   async deleteProduct(id: string): Promise<string> {
        const res = await this.productRepository.delete(id);
        console.log(res.affected);
        if (res.affected === 0) {
            return 'Delete failed';
        }
        return 'Delete successfully';
    }

}; 