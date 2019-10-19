
export class Constants {
  FUNCTION_NAME_REGEX: RegExp;

  constructor() {
    this.FUNCTION_NAME_REGEX = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g;
  }
}
