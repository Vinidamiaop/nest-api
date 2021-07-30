export class PaginateDto {
  constructor(public skip: number = 0, public take: number = 1) {}
}
