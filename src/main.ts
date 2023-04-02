import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './config/configuration';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder().setTitle('Title').setDescription('Description').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    app.useGlobalPipes(new ValidationPipe());

    SwaggerModule.setup('docs', app, document);

    await app.listen(configuration().port);
}
bootstrap();
