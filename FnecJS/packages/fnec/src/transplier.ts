import { ELEMENT_TYPES } from "./constants";
import { CustomProps, DomElement } from "./types";

export class Transplier {
  static createElement(type: string, props: CustomProps | null, ...children: any[]): DomElement {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "object"
            ? child
            : createTextElement(child)
        ),
      },
    }
  }

  // Fragment component for JSX fragments
  static Fragment = ELEMENT_TYPES.FRAGMENT_ELEMENT;
}


function createTextElement(text: string): DomElement {
  return {
    type: ELEMENT_TYPES.TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
