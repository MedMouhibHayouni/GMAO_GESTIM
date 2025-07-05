import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserResponseDto } from './dto/user-response.dto';
export declare class UsersService {
    private usersRepository;
    private rolesService;
    constructor(usersRepository: Repository<User>, rolesService: RolesService);
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: string): Promise<UserResponseDto>;
    findByUsername(username: string): Promise<User | undefined>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: string): Promise<void>;
    toResponseDto(user: User): UserResponseDto;
}
