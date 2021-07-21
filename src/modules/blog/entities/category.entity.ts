import { slugify } from 'src/utils/slugify';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, nullable: false })
  name: string;

  @Column({ length: 80, nullable: false, unique: true })
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  async slugify() {
    if (!this.slug) {
      if (this.name) {
        this.slug = slugify(this.name);
      }
    } else {
      this.slug = slugify(this.slug);
    }
  }
}
