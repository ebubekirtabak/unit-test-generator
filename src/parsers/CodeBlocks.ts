import { BlockModel } from "../models/block.model";

export class CodeBlocks {

  constructor() {

  }

  generateCodeBlock(type: string): BlockModel {
    const codeBlock = <BlockModel> {
      type: type,
      name: type,
      blockIsOpen: true,
      blocks: [],
      import: [],
      startIndex: 0,
      closeIndex: 0
    };
    return codeBlock;
  }
}
