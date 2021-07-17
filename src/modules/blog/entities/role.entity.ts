import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 80,
    default: 'user',
  })
  name: string;

  @Column({ length: 80, unique: true })
  slug: string;
}
