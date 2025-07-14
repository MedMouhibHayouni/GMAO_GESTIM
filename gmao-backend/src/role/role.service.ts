import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/common/constatns/roles.enum';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findByName(nom: RoleEnum): Promise<Role | undefined> {
    return this.roleRepository.findOne({
      where: { nom },
      relations: ['permissions'],
    });
  }

  async seedRoles() {
    const roles = Object.values(RoleEnum).map((role) => ({
      nom: role,
      description: `Rôle ${role}`,
    }));

    for (const role of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { nom: role.nom },
      });
      if (!existingRole) {
        await this.roleRepository.save(this.roleRepository.create(role));
      }
    }
  }
}
