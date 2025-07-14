import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { RoleEnum } from 'src/common/constatns/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('utilisateurs')
@UseGuards(JwtAuthGuard)
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return this.utilisateurService.create(createUtilisateurDto);
  }

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.RESPONSABLE_MAINTENANCE)
  async findAll() {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.RESPONSABLE_MAINTENANCE)
  async findOne(@Param('id') id: string) {
    return this.utilisateurService.findOne(+id);
  }
}
