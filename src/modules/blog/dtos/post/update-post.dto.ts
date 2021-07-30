import { Category } from '../../entities/category.entity';

export class UpdatePostDto {
  constructor(
    public title?: string,
    public summary?: string,
    public image?: string,
    public body?: string,
    public slug?: string,
    public category?: Category,
  ) {}
}
