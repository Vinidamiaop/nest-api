export class PaginationResultDto {
  public message: string;
  public success: boolean;
  public result: any;
  public total: number;
  public error: string;

  constructor(
    message: string,
    success: boolean,
    result: any,
    total: number,
    error: string,
  ) {
    this.message = message;
    this.success = success;
    this.result = result;
    this.total = total;
    this.error = error;
  }
}
