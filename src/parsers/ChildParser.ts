import { ExpressionChildModel, ThenProcessModel } from "../models/expression.model";
import { RegexParser } from "./RegexParser";
import { BlockModel } from "../models/block.model";

export class ChildParser {
  constructor(targetBlock: BlockModel) {

  }

  childParser(code: string, childKeyword: ExpressionChildModel) {
    const { regexp } = childKeyword;
    if (regexp) {
      const match = new RegexParser().getRegexMatch(regexp, code);
      code = code.substr(match.index, code.length);

      console.log(code);
      console.log(match[0].split(','));
    }
  }

  runForThen(value: string, then: ThenProcessModel) {
    switch(then.process) {
      case 'split':
        return value.split(then.value);
      default:
        return value;
    }
  }
}
