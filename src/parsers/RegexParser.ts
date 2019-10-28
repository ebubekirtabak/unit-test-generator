export class RegexParser {
  getRegexMatch(key: RegExp, text: string): RegExpExecArray {
    try {
      const regexp = new RegExp(key);
      return regexp.exec(text) || <RegExpExecArray>{ index: -1 };
    } catch(_) {
      return <RegExpExecArray>{ index: -1 };
    }
  }
}
