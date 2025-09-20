import { DomElement, MainThread, BackgroundThread } from "fnec-shared";

export type Fiber = DomElement & {
    dom: HTMLElement | Text | DocumentFragment,
    child: Fiber,
    sibling: Fiber,
    parent: Fiber,
    original: Fiber,
    effectTag?: "UPDATE" | "ADDITION" | "DELETION",
    threadType?: number
};