export interface BlockModel {
  type: string;
  name: string;
  blocks: BlockModel[];
  blockIsOpen: boolean;
  startIndex: number;
  closeIndex: number;
}
