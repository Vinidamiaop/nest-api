import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2000, nullable: true })
  bio: string;

  @Column({ length: 1024, nullable: true })
  image: string;
}
