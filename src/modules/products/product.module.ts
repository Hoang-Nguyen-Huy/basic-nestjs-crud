import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "src/entities/product.entity";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "src/roles/role.guard";
import { AuthGuard } from "src/auth/auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    exports: [TypeOrmModule],
    controllers: [ProductController],
    providers: [
        ProductService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ]
})

export class ProductModule{};