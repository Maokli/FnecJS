import { DomElement } from "fnec-shared"
import { VNodeFactory } from "./VNodeFactory";
import { Fiber } from "./types";
import { FnecReconciler } from "./FnecReconciler";

/**
 * Encapsulates the cooperative logic of building fiber trees.
 */
export class FiberBuilder {
    /** Head of the last constructed fiber tree */
    private head: Fiber;

    /** Head of the to-be rendered fiber tree, used for reconsiliation */
    private wipHead: Fiber;

    private vNodeFactory: VNodeFactory;

    private fnecReconciler: FnecReconciler;

    constructor() {
        this.vNodeFactory = new VNodeFactory();
        this.fnecReconciler = new FnecReconciler();
    }
    
    /**
     * Cooperatively builds the fiber tree one fiber at a time.
     * Returning the next fiber to build each time this is called.
     * @param element The element to build
     * @param container The root container
     * @returns The next element to build if any, null if not.
     */
    buildFiberRoot(element: DomElement, container: HTMLElement): Fiber {
        const head: Fiber = {
            type: null,
            dom: container,
            props: {
                children: [element]
            },
            child: null,
            sibling: null,
            parent: null,
            original: this.head
        }
    
        this.wipHead = head;
        this.performUnitOfWork(head);

        return this.getNextUnitOfWork(head);
    }

    /**
     * Cooperatively builds the fiber tree one fiber at a time.
     * Returning the next fiber to build each time this is called.
     * @param fiber The fiber to build
     * @returns The next fiber to build
     */
    buildFiber(fiber: Fiber): Fiber {
        if(fiber == null) {
            return fiber;
        }
        this.performUnitOfWork(fiber);

        return this.getNextUnitOfWork(fiber);
    }
    

    /**
     * Builds the dom of the root fiber and constructs the rest of the fibers.
     * @param head The fiber to build
     */
    private performUnitOfWork(head: Fiber)
    {
        if (!head.dom) {
            head.dom = this.vNodeFactory.buildNode(head);
        }

        this.fnecReconciler.reconsileChildren(head);

        if(this.getNextUnitOfWork(head) == null) {
            this.fnecReconciler.commitRoot(this.wipHead, () => {
                this.head = this.wipHead;
                this.wipHead = null;
            });
        }
    }

    /**
     * Gets the next fiber to perform work on.
     * @param head The root fiber
     * @returns The next fiber to build
     */
    private getNextUnitOfWork(head: Fiber): Fiber {
        if (head.child) {
            return head.child;
        }

        let nextFiber = head;
        while (nextFiber) {
            if(nextFiber.sibling) {
                return nextFiber.sibling;
            }

            nextFiber = nextFiber.parent;
        }

        return null;
    }
}