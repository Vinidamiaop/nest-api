import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 80,
    default: 'user',
  })
  name: string;

  @Column({ length: 80 })
  slug: string;
}
