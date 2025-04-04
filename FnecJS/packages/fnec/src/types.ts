
export type DomElement = {
  type: string,
  props: CustomProps | null,
}

export type CustomProps = {
  [key: string]: any;
  children?: DomElement[];
  nodeValue?: string;
};
