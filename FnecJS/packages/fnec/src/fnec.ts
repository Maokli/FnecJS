import { FnecRenderer } from "./renderer/renderer";
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
  static render = FnecRenderer.render;
}

export default Fnec;

export {};

