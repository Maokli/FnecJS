import { CustomProps } from "./customProps";
import { DomElement } from "./domElement";

export type FunctionComponent = (props: CustomProps) => DomElement;
