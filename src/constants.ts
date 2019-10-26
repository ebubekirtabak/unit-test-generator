import { KeywordModel } from "./models/keyword.model";

export class Constants {
  static FUNCTION_NAME_REGEX = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g;
  static CODE_BLOCK_REGEX = /({[a-z]*\n[\s\S]*?\n})|({[a-z]*[\s\S]*?})/g;
  static CLASS_NAME_REGEX = /(class)\s([^\n\s]*)|(export class)\s([^\n\s]*)|(export default class)\s([^\n\s]*)/g;
  static keywordList = [
    { regexp: /import/g, name: 'import', anotherKeyword: 'any' },
    { regexp: Constants.FUNCTION_NAME_REGEX, name: 'function', anotherKeyword: 'any' },
    { regexp: /export/g, name: 'export', anotherKeyword: 'any' },
    { regexp: Constants.CLASS_NAME_REGEX, name: 'class', anotherKeyword: 'any' }
  ];

  constructor() {
  }
}
