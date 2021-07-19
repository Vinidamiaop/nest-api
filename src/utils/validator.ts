export class Validator {
  constructor(public errors: any[] = []) {}

  isRequired(value: any, message: string) {
    if (!value || value.length <= 0) {
      this.errors.push(message);
    }
  }

  hasMinLen(value: any, min: number, message: string) {
    if (!value || value.length < min) {
      this.errors.push(message);
    }
  }

  hasMaxLen(value: any, max: number, message: string) {
    if (!value || value.length > max) {
      this.errors.push(message);
    }
  }

  isFixedLen(value: any, len: number, message: string) {
    if (value.length !== len) {
      this.errors.push(message);
    }
  }

  isEmail(value: any, message: string) {
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
      this.errors.push(message);
    }
  }

  clear() {
    this.errors = [];
  }

  isValid() {
    return this.errors.length === 0;
  }
}
