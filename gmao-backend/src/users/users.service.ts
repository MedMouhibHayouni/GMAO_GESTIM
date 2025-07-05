import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const role = await this.rolesService.findByName(createUserDto.role);
    const user = this.usersRepository.create({
      ...createUserDto,
      role,
    });
    const savedUser = await this.usersRepository.save(user);
    return this.toResponseDto(savedUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find({ relations: ['role'] });
    return users.map(this.toResponseDto);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException(`User not found`);
    return this.toResponseDto(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User not found`);

    let role = user.role;
    if (updateUserDto.role) {
      role = await this.rolesService.findByName(updateUserDto.role);
    }

    const updated = await this.usersRepository.save({
      ...user,
      ...updateUserDto,
      role,
    });
    return this.toResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  public toResponseDto(user: User): UserResponseDto {
    const { password: _unused, ...userData } = user;
    return userData;
  }
}
