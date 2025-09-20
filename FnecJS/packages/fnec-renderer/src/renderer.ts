import { DomElement, ImmediatePriority, MainThread } from "fnec-shared"
import { VNodeFactory } from "./VNodeFactory";
import { FnecScheduler } from "fnec-scheduler";
import { FiberBuilder } from "./FiberBuilder";

export class FnecRenderer {
  private static fnecScheduler: FnecScheduler | null = null;
  private static vNodeFactory: VNodeFactory | null = null;

  private static getScheduler(): FnecScheduler {
    if (!FnecRenderer.fnecScheduler) {
      FnecRenderer.fnecScheduler = new FnecScheduler();
    }
    return FnecRenderer.fnecScheduler;
  }

  static render(element: DomElement, container: HTMLElement) {
    try {
      // Use the fiber-based cooperative rendering with scheduler
      const fiber: FiberBuilder = new FiberBuilder();
      let nextUnitOfWork = fiber.buildFiberRoot(element, container);

      const renderFunction = (): boolean => {
        if (nextUnitOfWork == null) {
          return false; // No more work to do
        }

        // Perform one unit of work
        nextUnitOfWork = fiber.buildFiber(nextUnitOfWork);
        
        // Return true if there's more work, false if done
        return nextUnitOfWork != null;
      };

      // Schedule the rendering work
      const scheduler = FnecRenderer.getScheduler();
      scheduler.scheduleTask(renderFunction, ImmediatePriority, 0, MainThread);
      scheduler.startWork();
      
    } catch (error) {
      console.error('FnecRenderer error:', error);
    }
  }
}