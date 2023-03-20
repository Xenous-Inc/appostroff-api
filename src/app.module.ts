import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/users/users.model';
import { AuthModule } from './modules/auth/auth.module';
import { Auth } from './modules/auth/auth.model';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AtGuard } from './core/common/auth/guards';
import { SequelizeExceptionFilter } from './core/common/exceptions/sequelize-exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema,
            envFilePath: `${process.cwd()}/.${process.env.NODE_ENV}.env`,
            load: [configuration],
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: configuration().db_host,
            port: configuration().db_port,
            username: configuration().db_user,
            password: configuration().db_pass,
            database: configuration().db_name,
            autoLoadModels: true,
            dialectOptions:
                process.env.NODE_ENV == 'production'
                    ? { ssl: { require: 'true', rejectUnauthorized: false } }
                    : undefined,
            models: [User, Auth],
        }),
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
        { provide: APP_FILTER, useClass: SequelizeExceptionFilter },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        if (configuration().environment == 'development' || configuration().environment == 'debug') {
            consumer.apply(LoggerMiddleware).forRoutes('*');
        }
    }
}
