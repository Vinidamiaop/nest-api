export class CreateImageDto {
  constructor(
    public url: string,
    public filename: string,
    public title?: string,
  ) {}
}
