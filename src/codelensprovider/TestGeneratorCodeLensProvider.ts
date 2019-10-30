import { CodeLensProvider, TextDocument, CodeLens, Command, Range } from "vscode";


export class TestGeneratorCodeLensProvider implements CodeLensProvider {

  constructor() {

  }

  async provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
    console.log(document);
    let topOfDocument = new Range(0, 0, 0, 0);

    let c: Command = {
      command: 'extension.addFunction',
      title: 'Insert Function',
    };

    let codeLens = new CodeLens(topOfDocument, c);

    return [codeLens];
  }
}
