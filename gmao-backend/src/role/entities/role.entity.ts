import { Permission } from 'src/permission/entities/permission.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nom: string;

  @Column()
  description: string;

  @OneToMany(() => Utilisateur, (user) => user.role)
  utilisateurs: Utilisateur[];

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}
