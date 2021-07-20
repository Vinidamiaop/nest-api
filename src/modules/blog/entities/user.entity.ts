import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './role.entity';
import * as bcryptjs from 'bcryptjs';
import { slugify } from 'src/utils/slugify';

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

  @BeforeInsert()
  addUserRole() {
    this.roleId = { id: 2, name: 'user', slug: 'user' };
  }

  @BeforeInsert()
  @BeforeUpdate()
  async passHash() {
    this.passwordHash = await bcryptjs.hash(this.passwordHash, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async slugify() {
    if (!this.slug) {
      if (this.firstName && this.lastName) {
        this.slug = slugify(`${this.firstName} ${this.lastName}`);
      }
    } else {
      this.slug = slugify(this.slug);
    }
  }
}
