export interface ExpressionModel {
  regexp: RegExp;
  name: string;
  anotherKeyword: string;
  childs: ExpressionChildModel[];
}

export interface ExpressionChildModel {
  regexp: RegExp;
  name: string;
  then: ThenProcessModel[];
}

export interface ThenProcessModel {
  process: string;
  value: string;
  valueNumber: number;
  referanceName: string;
}
