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
    let textValue = element.props?.nodeValue;

    if(typeof textValue !== "string"){
      if(typeof textValue === "number") {
        textValue = (textValue as  number).toString();
      }
      else
        return;
    }
    
    return document.createTextNode(textValue);
  }

  private buildHtmlElementNode(element: DomElement) {
    if(typeof element.type != "string") {
      return;
    }
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
        else if(name.startsWith('on')) {
          const eventName = name.replace("on", "");
          vNode.addEventListener(eventName.toLowerCase(), props[name])
        }
        else
          vNode.setAttribute(name, props[name])
      })
  }

  private buildChildren(element: DomElement, vNode: HTMLElement | DocumentFragment) {
    return;
    const children = element.props?.children;

    if(ObjectUtils.isNullOrUndefined(children))
      return;

    children!.forEach(child => {
        const childVNode = this.buildNode(child);
        if (childVNode) {
          vNode.appendChild(childVNode);
        }
      }
    )
  }
}