import { User } from './users.model';
import { USER_REPOSITORY } from '../../core/constants';

export const usersProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: User,
    },
];
