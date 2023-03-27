import { ApiProperty } from '@nestjs/swagger';
import sequelize from 'sequelize';
import { Column, Table, DataType, Model, CreatedAt, UpdatedAt, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Auth } from '../auth/auth.model';
import { Role } from '../roles/roles.model';
import { Story } from '../stories/stories.model';
import { UserToRole } from './user-role.model';
import { UserToStory } from './user-story.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @ApiProperty({ description: 'Уникальный идентификатор' })
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @ApiProperty({ example: '+79620440994', description: 'Phone' })
    @Column({ type: DataType.STRING, unique: true })
    phone: string;

    @ApiProperty({ example: 'sidor', description: 'Name' })
    @Column({ type: DataType.STRING })
    name: string;

    @HasMany(() => Auth)
    auths: Auth[];

    @ApiProperty({ example: '', description: 'Hashed Refresh Token' })
    @Column({ type: DataType.STRING })
    hashedRt: string;

    @BelongsToMany(() => Story, () => UserToStory)
    stories: Array<Story & { UserToStory: UserToStory }>;

    @BelongsToMany(() => Role, () => UserToRole)
    roles: Role[];

    @ApiProperty({ example: true, description: 'If user banned' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isBanned: boolean;

    @ApiProperty({ example: 'PIDOR', description: 'The reason for ban' })
    @Column({ type: DataType.STRING })
    banReason: string;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    //	quotes: ...
    //	stats:...
    //	interests: ...
    //	settings: ...
}
