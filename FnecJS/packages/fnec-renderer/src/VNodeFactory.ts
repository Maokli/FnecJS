import { CustomProps, DomElement } from "fnec-shared";
import { ObjectUtils } from "fnec-shared"
import { ELEMENT_TYPES } from "fnec-shared";

export class VNodeFactory {
  buildNode(element: DomElement) {
    switch (element.type) {
      case ELEMENT_TYPES.TEXT_ELEMENT:
        return this.buildTextNode(element);

      case ELEMENT_TYPES.FRAGMENT_ELEMENT:
        return this.buildFragmentNode(element);
    
      default:
        return this.buildHtmlElementNode(element);
    }
  }

  private buildTextNode(element: DomElement) {
    const textValue = element.props?.nodeValue;

    if(typeof textValue !== "string"){
      throw new SyntaxError("Cannot create a null text node.");
    }
    
    return document.createTextNode(textValue);
  }

  private buildHtmlElementNode(element: DomElement) {
    const vNode = document.createElement(element.type);

    this.setProps(vNode, element.props);
    this.buildChildren(element, vNode);

    return vNode;
  }

  private buildFragmentNode(element: DomElement): DocumentFragment {
    const fragment = document.createDocumentFragment();
      
    // Append all children to the fragment
    this.buildChildren(element, fragment)
    
    return fragment;
  }

  private setProps(vNode: HTMLElement, props: CustomProps | null) {
    if(props == null)
      return;
    const isProperty = (key: string) => key !== "children"

    Object.keys(props)
      .filter(isProperty)
      .forEach(name => {
        if(name === "className")
          vNode.setAttribute("class", props[name])
        else
          vNode.setAttribute(name, props[name])
      })
  }

  private buildChildren(element: DomElement, vNode: HTMLElement | DocumentFragment) {
    const children = element.props?.children;

    if(ObjectUtils.isNullOrUndefined(children))
      return;

    children!.forEach(child => {
        const childVNode = this.buildNode(child);
        vNode.appendChild(childVNode);
      }
    )
  }
}