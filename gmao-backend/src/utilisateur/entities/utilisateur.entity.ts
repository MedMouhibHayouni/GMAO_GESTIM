import { Role } from 'src/role/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  motDePasse: string;

  @ManyToOne(() => Role, (role) => role.utilisateurs, { eager: true }) // Chargement eager du rôle
  role: Role;

  /*@OneToMany(() => Message, (message) => message.utilisateur)
  messages: Message[];

  @OneToMany(() => Journal, (journal) => journal.utilisateur)
  journaux: Journal[];*/
}
