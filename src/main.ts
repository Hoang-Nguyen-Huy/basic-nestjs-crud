import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
                        .addBearerAuth()
                        .setTitle('Basic-NestJS-CRUD')
                        .setDescription('The basic API description')
                        .setVersion('1.0')
                        .addTag('users')
                        .addTag('auth')
                        .addTag('products')
                        .addBearerAuth()
                        .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
