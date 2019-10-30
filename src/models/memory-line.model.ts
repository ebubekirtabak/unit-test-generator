import { BlockModel } from './block.model';

export interface MemoryLineModel {
  fileName: string;
  filePath: string;
  blocks: BlockModel[];
}
