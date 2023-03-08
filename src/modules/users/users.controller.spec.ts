import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
const doomeId = v4();
const doomeUser = { id: doomeId, phone: '123123', name: 'sidor' };

describe('UsersController', () => {
    let userContoller: UsersController;
    let userService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        findAll: jest.fn(() => [doomeUser]),
                        create: jest.fn(() => doomeUser),
                        remove: jest.fn(),
                        findOne: jest.fn().mockImplementation((id: string) => {
                            return Promise.resolve({
                                id,
                                phone: '123123',
                                name: 'sidor',
                            });
                        }),
                    },
                },
            ],
        }).compile();
        userContoller = module.get(UsersController);
        userService = module.get<UsersService>(UsersService);
    });
    describe('testing CRUD methods in controller', () => {
        let newUser;
        const newUpdatedUser = { phone: '38948934', name: 'NE SIDOR' };
        it('should create new user', async () => {
            newUser = await userContoller.create({ phone: '123123', name: 'sidor' });
            expect(newUser).toEqual(doomeUser);
        });

        it('should find all', async () => {
            expect(await userContoller.findAll()).toEqual([doomeUser]);
        });

        it('should get user by id', async () => {
            const findedUser = await userContoller.findOne(newUser.id);
            expect(await userService.findOne).toHaveBeenCalled();
            expect(findedUser).toEqual(doomeUser);
        });
    });
});
