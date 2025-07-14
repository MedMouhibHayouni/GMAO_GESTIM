import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../role/role.service';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private roleService: RoleService,
  ) {}

  async create(
    createUtilisateurDto: CreateUtilisateurDto,
  ): Promise<Utilisateur> {
    const { motDePasse, ...rest } = createUtilisateurDto;

    // Hachage du mot de passe uniquement ici
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const role = await this.roleService.findByName(createUtilisateurDto.role);
    if (!role) {
      throw new NotFoundException('Rôle non trouvé');
    }

    const utilisateur = this.utilisateurRepository.create({
      ...rest,
      motDePasse: hashedPassword, // Utiliser le mot de passe hashé
      role,
    });

    return this.utilisateurRepository.save(utilisateur);
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find({ relations: ['role'] });
  }

  async findOne(id: number): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return utilisateur;
  }

  async findByEmail(email: string): Promise<Utilisateur | null> {
    return this.utilisateurRepository.findOne({
      where: { email },
      relations: ['role'],
      select: ['id', 'nom', 'email', 'motDePasse', 'role'], // Inclure explicitement motDePasse
    });
  }
}
