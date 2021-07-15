import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ length: 120 })
  passwordHash: string;

  @Column({ length: 80, unique: true })
  slug: string;

  @Column({ type: 'datetime' })
  birthDate: Date;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;
}
