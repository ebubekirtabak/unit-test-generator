export interface KeywordModel {
  regexp: RegExp;
  name: string;
  anotherKeyword: string;
  childs: KeywordChildModel[];
}

export interface KeywordChildModel {
  regexp: RegExp;
  name: string;
  splitBy: string;
}
