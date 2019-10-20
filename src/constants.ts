
export class Constants {
  static FUNCTION_NAME_REGEX = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g;
  static CLASS_NAME_REGEX = `(class)\s([^\n\s]*)`;
  constructor() {
  }
}
