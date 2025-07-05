import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    const role = this.rolesRepository.create(createRoleDto);
    const savedRole = await this.rolesRepository.save(role);
    return this.toResponseDto(savedRole);
  }

  async findAll(): Promise<RoleResponseDto[]> {
    const roles = await this.rolesRepository.find();
    return roles.map(this.toResponseDto);
  }

  async findOne(id: string): Promise<RoleResponseDto> {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) throw new NotFoundException(`Role not found`);
    return this.toResponseDto(role);
  }

  async findByName(name: string): Promise<Role> {
    return this.rolesRepository.findOneBy({ name });
  }

  private toResponseDto(role: Role): RoleResponseDto {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
    };
  }
}
