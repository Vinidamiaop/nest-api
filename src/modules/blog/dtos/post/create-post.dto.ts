import { Category } from '../../entities/category.entity';
import { User } from '../../entities/user.entity';

export class CreatePostDto {
  constructor(
    public author: User,
    public title: string,
    public summary: string,
    public image: string,
    public body: string,
    public slug?: string,
    public category?: Category,
  ) {}
}
