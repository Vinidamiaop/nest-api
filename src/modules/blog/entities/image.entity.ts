import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1024, nullable: false })
  url: string;

  @Column({ length: 100, nullable: false })
  filename: string;

  @Column({ length: 80, nullable: true })
  title?: string;
}
