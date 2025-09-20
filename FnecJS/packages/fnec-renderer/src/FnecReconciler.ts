import { CustomProps } from "packages/fnec-shared";
import { Fiber } from "./types";

export class FnecReconciler {
    deletions: Array<Fiber> = [];

    reconsileChildren(head: Fiber) {
        let oldFiber = head.original && head.original.child;
        let elements = head.props.children;
        let index = 0;
        let prevSibling: Fiber = null;

        while (index < elements.length || oldFiber != null)
        {
            const element = elements[index];

            const sameType = oldFiber 
                && element 
                && element.type == oldFiber.type;

            let newFiber: Fiber = null;

            if(sameType) {
                newFiber = {
                    type: element.type,
                    props: element.props,
                    parent: head,
                    dom: null,
                    child: null,
                    sibling: null,
                    original: oldFiber,
                    effectTag: "UPDATE"
                }
            }
            
            if(element && !sameType) {
                newFiber = {
                    type: element.type,
                    props: element.props,
                    parent: head,
                    dom: null,
                    child: null,
                    sibling: null,
                    original: null,
                    effectTag: "ADDITION"
                }
            }

            if(oldFiber && !sameType){
                oldFiber.effectTag = "DELETION";
                this.deletions.push(oldFiber);
            }

            if (index === 0) {
                head.child = newFiber;
            } else {
                prevSibling.sibling = newFiber;
            }

            prevSibling = newFiber;
            index++;
        }
    }

    commitRoot(root: Fiber, onCommitCallback: () => void) {
        this.deletions.forEach(this.commitWork);
        this.commitWork(root.child);

        // Reset deletions and work in progress head. And set the new head
        this.deletions = [];
        onCommitCallback();
    }

    private commitWork(fiber: Fiber) {
        if(!fiber) {
            return;
        }

        const parentDom = fiber.parent.dom;
        if(fiber.effectTag === "ADDITION" && fiber.dom) {
            parentDom.appendChild(fiber.dom);
        } else if (fiber.effectTag === "DELETION") {
            parentDom.removeChild(fiber.dom);
        }
        else if (fiber.effectTag === "UPDATE") {
            this.updateDom(fiber.dom, fiber.original.props, fiber.props)
        }

        this.commitWork(fiber.child);
        this.commitWork(fiber.sibling);
    }

    private updateDom(dom: HTMLElement | Text | DocumentFragment, oldProps: CustomProps, newProps: CustomProps) {
        const isProperty = key => key !== "children"
        const isNew = (prev, next) => key =>
        prev[key] !== next[key]
        const isGone = (prev, next) => key => !(key in next)

        // Remove old properties
        Object.keys(oldProps)
            .filter(isProperty)
            .filter(isGone(oldProps, newProps))
            .forEach(name => {
            dom[name] = ""
            })

        // Set new or changed properties
        Object.keys(newProps)
            .filter(isProperty)
            .filter(isNew(oldProps, newProps))
            .forEach(name => {
            dom[name] = newProps[name]
            })
    }
}