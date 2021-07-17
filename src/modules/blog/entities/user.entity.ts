import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  firstName: string;

  @Column({ length: 80 })
  lastName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 120, select: false })
  passwordHash: string;

  @Column({ length: 80, unique: true, nullable: false })
  slug: string;

  @Column({ type: 'datetime', nullable: true })
  birthDate?: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  @JoinColumn({ name: 'roleId' })
  roleId: Role;
}
