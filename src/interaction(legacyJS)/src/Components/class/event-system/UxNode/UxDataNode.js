import { ComponentEnum } from "../../../views/02. Studio/04. EventPanel/data/Data";
import Node from "../Node";

export class UxDataNode extends Node {
  constructor(name, uuid, type = ComponentEnum.UX_DATA) {
    super(name, uuid, type);
  }
}
