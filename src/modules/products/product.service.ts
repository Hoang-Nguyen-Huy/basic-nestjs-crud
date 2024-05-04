import { Injectable } from "@nestjs/common";
import { Product } from "src/models/product.model";

@Injectable()
export class ProductService{

    private products: Product[] = [
        {id: 1, categoryId: 2, price: 8000, productName: "Iphone"},
        {id: 2, categoryId: 3, price: 9000, productName: "Samsung"},
        {id: 3, categoryId: 4, price: 10000, productName: "Nokia"},
    ]

    getProducts(): Product[] {
        return this.products;
    }
 
    createProduct(): string {
        return 'POST product';
    }

    detailProduct(id: number): Product {
        return this.products.find(item => item.id === Number(id));
    }

    updateProduct(): string {
        return 'UPDATE product';
    }

    deleteProduct(): string {
        return 'DELETE product';
    }

}; 