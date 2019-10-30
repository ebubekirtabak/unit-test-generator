export class RegexParser {
  getRegexMatch(key: RegExp, text: string): RegExpExecArray {
    try {
      const regexp = new RegExp(key, 'g');
      let match = regexp.exec(text) as RegExpExecArray;
      return this.matchFilter(match);
    } catch(_) {
      return <RegExpExecArray>{ index: -1 };
    }
  }

  matchFilter(match: RegExpExecArray): RegExpExecArray {
    if (match !== null) {
      return match = match.filter((item) => [null, undefined, 'undefined', ''].indexOf(item) < 0) as RegExpExecArray;
    }

    return <RegExpExecArray>{ index: -1 };
  }
}
