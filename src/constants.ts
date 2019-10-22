import { KeywordModel } from "./models/keyword.model";

export class Constants {
  static FUNCTION_NAME_REGEX = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g;
  static CLASS_NAME_REGEX = `(class)\s([^\n\s]*)`;
  static keywordList = [
    { regexp: /import/g, name: 'import', anotherKeyword: 'any' },
    { regexo: Constants.FUNCTION_NAME_REGEX, name: 'function', anotherKeyword: 'any' },
    { regexp: /export/g, name: 'export', anotherKeyword: 'any' },
    { regexp: Constants.CLASS_NAME_REGEX, name: 'class', anotherKeyword: 'any' }
  ];

  constructor() {
  }
}
