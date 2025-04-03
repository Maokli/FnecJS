
type Element = {
  type: string,
  props: CustomProps | null,
}

export type CustomProps = {
  [key: string]: any;
  children?: CustomProps[];
  nodeValue?: string;
};

export class Transplier {
  static createElement(type: string, props: CustomProps | null, ...children: CustomProps[]): Element {
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
  static Fragment(props: { children: CustomProps[] }): CustomProps {
    return props.children;
  }
}


function createTextElement(text: string): Element {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
