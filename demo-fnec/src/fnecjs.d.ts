declare module 'fnecjs' {
  export default Fnec;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare class Fnec {
  static createElement(type: any, props: any, ...children: any[]): any;
  static Fragment: any;
  static render(element: any, container: HTMLElement): void;
  static useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void];
  static useInteractiveState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void];
}
