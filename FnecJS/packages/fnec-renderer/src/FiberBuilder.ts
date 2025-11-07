import { BackgroundThread, DomElement, FunctionComponent, ImmediatePriority, MainThread } from "fnec-shared"
import { VNodeFactory } from "./VNodeFactory";
import { Fiber, Hook } from "./types";
import { FnecReconciler } from "./FnecReconciler";
import { SchedulerProvider } from "./SchedulerProvider";

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

    private schedulerProvider: SchedulerProvider;

    /* We use it to track the current work in progress fiber */
    private wipFiber: Fiber;

    /* We use it to track the hook index of the current work in progress fiber */
    private hookIndex: number;

    constructor() {
        this.vNodeFactory = new VNodeFactory();
        this.fnecReconciler = new FnecReconciler();
        this.schedulerProvider = new SchedulerProvider();
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
            original: this.head,
            hooks: []
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
        const isFunctionComponent = head.type instanceof Function;
        if(isFunctionComponent) { 
            this.UpdateFunctionComponent(head)
        }
        else {
            this.UpdateJsxComponent(head);
        }

        if(this.getNextUnitOfWork(head) == null) {
            this.fnecReconciler.commitRoot(this.wipHead, () => {
                // Clear all queues from the committed fiber tree now that render is complete
                this.clearHookQueues(this.wipHead);
                this.head = this.wipHead;
                this.head.hooks = this.wipHead.hooks;
                this.wipHead = null;
            });
        }
    }

    private UpdateFunctionComponent(head: Fiber) {
        if(head.type instanceof Function) {
            const children = [head.type(head.props)];
            this.wipFiber = head;
            this.hookIndex = 0;
            this.wipFiber.hooks = [];
            this.fnecReconciler.reconcileChildren(head, children);
        }
    }


    UseState<T>(initial: T, isUiTask = false) {
    const myIndex = this.hookIndex;
    const hookFiber = this.wipFiber;

    // Retrieve previous (committed) hook from the SAME fiber's original (if exists)
    const committedFiber = hookFiber && hookFiber.original;
    const oldHook = committedFiber && committedFiber.hooks && committedFiber.hooks[myIndex];


    // Create a new hook for this render
    const hook: Hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    };

    // Apply queued actions from the previous committed hook
    const actions = oldHook && oldHook.queue ? oldHook.queue.slice() : [];
    actions.forEach(action => {
        hook.state = (typeof action === 'function') ? action(hook.state) : action;
    });

    // setState closure
    const setState = (action) => {
        let committedComponentFiber: Fiber | null = null;
        
        // If this is not the initial render, find the committed fiber
        if (this.head) {
            const findMatchingFiber = (fiber: Fiber | null): Fiber | null => {
                if (!fiber) return null;
                if (fiber.type === hookFiber.type) return fiber;
                
                // Search in children
                let child = fiber.child;
                while (child) {
                    const found = findMatchingFiber(child);
                    if (found) return found;
                    child = child.sibling;
                }
                return null;
            };
            
            committedComponentFiber = findMatchingFiber(this.head);
        }
        
        const committedHook = committedComponentFiber?.hooks?.[myIndex];

        const targetQueue = committedHook ? committedHook.queue : hook.queue;
        targetQueue.push(action);

        this.wipHead = {
            ...this.head,
            dom: this.head.dom,
            props: this.head.props,
            original: this.head,
            hooks: this.head.hooks ? this.head.hooks.slice() : []
        };

        // Start cooperative render loop
        let nextUnitOfWork = this.buildFiber(this.wipHead);
        const renderFunction = (): boolean => {
            if (nextUnitOfWork == null) return false;
            nextUnitOfWork = this.buildFiber(nextUnitOfWork);
            return nextUnitOfWork != null;
        };

        const scheduler = this.schedulerProvider.getScheduler();
        scheduler.scheduleTask(
            renderFunction,
            ImmediatePriority,
            0,
            isUiTask ? MainThread : BackgroundThread
        );
        scheduler.startWork();
    };

    if (!this.wipFiber.hooks) this.wipFiber.hooks = [];
    this.wipFiber.hooks[myIndex] = hook;
    this.hookIndex++;

    return [hook.state, setState];
}



    private UpdateJsxComponent(head: Fiber) {
        if (!head.dom) {
            head.dom = this.vNodeFactory.buildNode(head);
        }
        
        this.fnecReconciler.reconcileChildren(head, head.props?.children);
    }

    /**
     * Recursively clears all hook queues in the fiber tree after commit.
     * This ensures that queued actions are only applied once.
     * @param fiber The fiber to start clearing from
     */
    private clearHookQueues(fiber: Fiber) {
        if (!fiber) return;

        // Clear hooks for this fiber
        if (fiber.hooks) {
            fiber.hooks.forEach(hook => {
                if (hook && hook.queue) {
                    hook.queue = [];
                }
            });
        }

        // Recursively clear child and sibling fibers
        this.clearHookQueues(fiber.child);
        this.clearHookQueues(fiber.sibling);
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