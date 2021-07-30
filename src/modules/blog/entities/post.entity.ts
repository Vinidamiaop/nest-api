import { slugify } from 'src/utils/slugify';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ length: 160, nullable: false })
  title: string;

  @Column({ length: 255, nullable: false })
  summary: string;

  @Column({ length: 1024, nullable: true })
  image: string;

  @Column({ type: 'text', nullable: false })
  body: string;

  @Column({ length: 80, nullable: false, unique: true })
  slug: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @BeforeInsert()
  atCreation() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    if (!this.slug) {
      if (this.title) {
        this.slug = slugify(this.title);
      }
    } else {
      this.slug = slugify(this.slug);
    }
  }

  @BeforeUpdate()
  atUpdate() {
    this.updatedAt = new Date();
    if (!this.slug) {
      if (this.title) {
        this.slug = slugify(this.title);
      }
    } else {
      this.slug = slugify(this.slug);
    }
  }
}
