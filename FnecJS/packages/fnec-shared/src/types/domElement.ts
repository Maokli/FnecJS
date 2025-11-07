import { CustomProps } from "./customProps";
import { FunctionComponent } from "./functionalComponent";

export type DomElement = {
  type: string | FunctionComponent,
  props: CustomProps | null,
}
