import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    exports: [TypeOrmModule],
    controllers: [ProductController],
    providers: [ProductService]
})

export class ProductModule{};