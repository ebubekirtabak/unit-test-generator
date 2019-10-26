import { Constants } from "../constants";
import { BlockModel } from "../models/block.model";
import { KeywordModel } from "../models/keyword.model";

export class TypeScriptParser {
  targetBlock: BlockModel;
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

  parse() {
    const regexp = new RegExp(Constants.FUNCTION_NAME_REGEX);
    const functions = regexp.test(this.testCode);
    let index = 0;
    do {
      this.testCode = this.testCode.substr(index, this.testCode.length);
      index = this.getCodePart(this.testCode);
      console.log(index);
    }
    while(index < this.testCode.length);

    console.log(functions);
  }

  getCodePart(code: string) {
    const firstRegexp = this.getIndexByRegexp(this.testCode);
    const { index, keyword } = firstRegexp;
    const regexpSource = keyword.regexp.source;
    const startIndex = (index + regexpSource.length);
    const nextCode = code.substr(startIndex, code.length);
    const lastRegexp = this.getNextRegexp(nextCode, keyword);
    const cropCode = code.substr(0, (startIndex + lastRegexp.index));
    console.log(cropCode.trim());
    return (startIndex + lastRegexp.index);
  }
  getIndexByRegexp(code: string) {
    let regexpIndex = { index: -1, keyword: <KeywordModel>{} };
    for(let i = 0; i < Constants.keywordList.length; ++i) {
      const keyword = Constants.keywordList[i];
      const match = this.getRegexMatch(keyword.regexp, code);
      const { index } = match;
      if (index !== null && index > -1) {
        regexpIndex.index = index;
        regexpIndex.keyword = keyword;
        break;
      }
    }

    return regexpIndex;
  }

  getNextRegexp(code: string, keyword: KeywordModel) {
    switch(keyword.anotherKeyword) {
      case 'any':
        return this.getIndexByRegexp(code);
        break;
      default:
        return this.getRegexMatch(keyword.regexp, code);
    }
  }

  getRegexMatch(key: RegExp, text: string) {
    try {
      const regexp = new RegExp(key);
      return regexp.exec(text) || { index: -1 };
    } catch(_) {
      return { index: -1 };
    }
  }
}
