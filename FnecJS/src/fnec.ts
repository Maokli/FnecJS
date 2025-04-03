import { Transplier } from "./transplier";
declare global {
  namespace  JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

class Fnec {
  static createElement = Transplier.createElement;
  static Fragment = Transplier.Fragment;
}

export default Fnec;

export {};

