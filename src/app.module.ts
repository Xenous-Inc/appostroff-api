import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { Story } from './modules/stories/stories.model';
import { UserToStory } from './modules/models/user-story.model';
import { StoriesModule } from './modules/stories/stories.module';
import { StoryToAuthor } from './modules/models/story-author.model';
import { Author } from './modules/authors/authors.model';
import { Genre } from './modules/genres/genres.model';
import { GenreToAuthor } from './modules/models/genre-author.model';
import { AuthorsModule } from './modules/authors/authors.module';
import { GenresModule } from './modules/genres/genres.module';
import { StoryToGenre } from './modules/models/story-genre.model';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/roles.model';
import { UserToRole } from './modules/models/user-role.model';
import { User } from './modules/users/users.model';
import { Auth } from './modules/auth/auth.model';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AtGuard } from './core/common/auth/guards';
import { SequelizeExceptionFilter } from './core/common/exceptions/sequelize-exception.filter';
import { AdminModule } from '@adminjs/nestjs';

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
            models: [
                User,
                Story,
                Author,
                Genre,
                UserToStory,
                UserToRole,
                StoryToAuthor,
                GenreToAuthor,
                StoryToGenre,
                Role,
                Auth,
            ],
            // dialectOptions:
            //     process.env.NODE_ENV == 'production'
            //         ? { ssl: { require: 'true', rejectUnauthorized: false } }
            //         : undefined,
        }),
        RolesModule,
        GenresModule,
        AuthorsModule,
        StoriesModule,
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
