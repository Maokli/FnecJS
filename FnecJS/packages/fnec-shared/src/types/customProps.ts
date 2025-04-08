import { DomElement } from "./domElement";

export type CustomProps = {
  [key: string]: any;
  children?: DomElement[];
  nodeValue?: string;
};
