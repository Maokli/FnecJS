import { FnecRenderer } from "fnec-renderer";
import { FnecTranspiler } from "fnec-transpiler";
declare global {
  namespace  JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

class Fnec {
  static createElement = FnecTranspiler.createElement;
  static Fragment = FnecTranspiler.Fragment;
  static render = FnecRenderer.render;
}

export default Fnec;

export {};

