import { ELEMENT_TYPES } from "../constants"
import { CustomProps, DomElement } from "../types"
import { VNodeFactory } from "./VNodeFactory";

export class FnecRenderer {
  private static readonly vNodeFactory: VNodeFactory = new VNodeFactory();

  static render(element: DomElement, container: HTMLElement) {
    const vNode = FnecRenderer.vNodeFactory.buildNode(element);
    container.appendChild(vNode);
  }
}