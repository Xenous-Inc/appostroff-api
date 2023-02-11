import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { DatabaseModule } from './core/database/database.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema,
            envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
            load: [configuration],
            isGlobal: true,
        }),
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
