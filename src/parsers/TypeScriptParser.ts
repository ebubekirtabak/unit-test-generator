import { Constants } from "../constants";
import { BlockModel } from "../models/block.model";
import { ExpressionModel } from "../models/expression.model";
import { RegexParser } from "./RegexParser";

export class TypeScriptParser {
  targetBlock: BlockModel;
  codeBlocks: BlockModel[];
  public configs: any;
  testCode = `
  import { workspace, Uri } from "vscode";
import {
    getInitialVSCodeMetricsConfiguration,
    IVSCodeMetricsConfiguration
} from "../metrics/common/VSCodeMetricsConfiguration";

export class AppConfiguration {
    constructor() {}
    get extensionName() {
        return "codemetrics";
    }
    public toggleCodeMetricsForArrowFunctionsExecuted: boolean = false;
    public codeMetricsForArrowFunctionsToggled: boolean = true;
    public codeMetricsDisplayed: boolean = true;

    getCodeMetricsSettings(resource: Uri): IVSCodeMetricsConfiguration {
        var settings = workspace.getConfiguration(this.extensionName, resource);
        const resultingSettings = getInitialVSCodeMetricsConfiguration();
        for (var propertyName in resultingSettings) {
            var property = "nodeconfiguration." + propertyName;
            if (settings.has(property)) {
                resultingSettings[propertyName] = settings.get(property);
                continue;
            }
            property = "basics." + propertyName;
            if (settings.has(property)) {
                resultingSettings[propertyName] = settings.get(property);
                continue;
            }
        }
        for (var propertyName in resultingSettings.LuaStatementMetricsConfiguration) {
            property = "luaconfiguration." + propertyName;
            if (settings.has(property)) {
                resultingSettings.LuaStatementMetricsConfiguration[propertyName] = settings.get(property);
                continue;
            }
        }
        if (this.toggleCodeMetricsForArrowFunctionsExecuted) {
            resultingSettings.MetricsForArrowFunctionsToggled = this.codeMetricsForArrowFunctionsToggled;
        }
        return resultingSettings;
    }
}
  `;

  constructor() {
    this.configs = new Constants().getLanguageConfig();
  }

  parse() {
    let index = 0;
    do {
      this.testCode = this.testCode.substr(index, this.testCode.length);
      index = this.getCodePart(this.testCode);
      console.log(index);
    }
    while(index < this.testCode.length);
  }

  getCodePart(code: string) {
    const firstRegexp = this.getIndexByRegexp(this.testCode);
    const { index, keyword, match } = firstRegexp;
    const text = match[0];
    const startIndex = (index + text.length);
    const nextCode = code.substr(startIndex, code.length);
    const lastRegexp = this.getNextRegexp(nextCode, keyword);
    const lastIndex = lastRegexp.index || index;
    const cropCode = code.substr(0, (startIndex + lastIndex));
    console.log(cropCode.trim());

    this.codePartParser(cropCode.trim(), keyword);
    return (startIndex + lastRegexp.index);
  }

  getRegexpRange() {

  }

  getIndexByRegexp(code: string) {
    let regexpIndex = { index: -1, keyword: <ExpressionModel>{}, match: <RegExpExecArray>{} };
    for(let i = 0; i < this.configs.expressions.length; ++i) {
      const keyword = this.configs.expressions[i];
      const match = new RegexParser().getRegexMatch(keyword.expression, code);
      const { index } = match;
      if (index !== null && index > -1) {
        regexpIndex.index = index;
        regexpIndex.match = match;
        regexpIndex.keyword = keyword;
        break;
      }
    }

    return regexpIndex;
  }

  getNextRegexp(code: string, keyword: ExpressionModel) {
    switch(keyword.anotherKeyword) {
      case 'any':
        return this.getIndexByRegexp(code);
      default:
        return new RegexParser().getRegexMatch(keyword.regexp, code);
    }
  }

  codePartParser(code: string, keyword: ExpressionModel) {
    keyword.childs.forEach(element => {

    });
  }


}
