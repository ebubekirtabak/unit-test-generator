import { Constants } from "../constants";
import { BlockModel } from "../models/block.model";

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
    while(index < this.testCode.length) {
      const blockIndex = this.getIndexByRegexp(this.testCode);
      index = blockIndex.lastIndex;
    }

    console.log(functions);
  }

  getIndexByRegexp(code: string) {
    const regexpRange = { firstIndex: -1, lastIndex: -1};
    for(let i = 0; i < Constants.keywordList.length; ++i) {
      const keyword = Constants.keywordList[i];
      const match = this.getRegexMatch(keyword.regexp, code);
      const { index } = match || { index: -1 };
      if (index !== null && index > -1) {
        const matchNextIndex = this.getRegexMatch(keyword.regexp, code.substring(index, code.length));
        { }
        break;
      }
    }

    return regexpRange;
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
