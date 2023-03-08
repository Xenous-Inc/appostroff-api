import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.model';
import { configuration } from '../../config/configuration';

const doomeUser = { phone: '123123', name: 'sidor' };
const updatedDoomeUser = { phone: '321321', name: 'NEsidor' };

describe('UsersService', () => {
    let userService: UsersService;
    let userModel: typeof User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken(User),
                    useValue: {
                        update: jest.fn(() => doomeUser),
                        findAll: jest.fn(() => [doomeUser]),
                        findOne: jest.fn(),
                        create: jest.fn(() => doomeUser),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();
        userService = module.get<UsersService>(UsersService);
        userModel = module.get<typeof User>(getModelToken(User));
    });
    describe('testing CRUD methods', () => {
        it('should create user', async () => {
            expect(await userService.create({ phone: '123123', name: 'sidor' })).toEqual(doomeUser);
        });

        it('should find all users', async () => {
            expect(await userModel.findAll()).toEqual([doomeUser]);
        });

        it('should find one user', async () => {
            const findSpy = jest.spyOn(userModel, 'findOne');
            expect(userService.findOne('id'));
            expect(findSpy).toBeCalledWith({ where: { id: 'id' } });
        });

        it('should remove a user', async () => {
            const destroyL = jest.fn();
            const findSpy = jest.spyOn(userModel, 'findOne').mockReturnValue({
                destroy: destroyL,
            } as any);

            const retVal = await userService.removeUser('id');
            expect(findSpy).toBeCalledWith({ where: { id: 'id' } });
        });

        /* it('should update user', async () => {
            const updateSpy = jest.spyOn(userModel, 'update');
            expect(updateSpy).toBeCalledWith({ where: { id: 'id' } });
        }); */
    });
});
