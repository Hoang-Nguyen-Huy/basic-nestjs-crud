import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductHttpModule } from './modules/products/product-http.module';
import { AuthModule } from './auth/auth.module';
import { UsersHttpModule } from './users/users-http.module';
import { UsersEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '13022014',
      database: 'nestconnectdb',
      entities: [ProductEntity, UsersEntity],
      synchronize: true,
    }),
    ProductHttpModule,
    AuthModule,
    UsersHttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {};
}
