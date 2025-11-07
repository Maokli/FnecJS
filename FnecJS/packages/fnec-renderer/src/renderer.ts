import { DomElement, ImmediatePriority, MainThread } from "fnec-shared"
import { VNodeFactory } from "./VNodeFactory";
import { FiberBuilder } from "./FiberBuilder";
import { SchedulerProvider } from "./SchedulerProvider";

export class FnecRenderer {
  private static schedulerProvider: SchedulerProvider | null = null;
  private static vNodeFactory: VNodeFactory | null = null;
  private static fiber: FiberBuilder | null = null;

  private static ensureInitialized() {
    if (!this.schedulerProvider) {
      this.schedulerProvider = new SchedulerProvider();
    }
    if (!this.fiber) {
      this.fiber = new FiberBuilder();
    }
  }

  static render(element: DomElement, container: HTMLElement) {
    try {
      if (!this.schedulerProvider) {
        this.schedulerProvider = new SchedulerProvider();
      }
      if (!this.fiber) {
        this.fiber = new FiberBuilder();
      }
      let nextUnitOfWork = this.fiber!.buildFiberRoot(element, container);

      const renderFunction = (): boolean => {
        if (nextUnitOfWork == null) {
          return false; // No more work to do
        }

        // Perform one unit of work
        nextUnitOfWork = this.fiber!.buildFiber(nextUnitOfWork);
        
        // Return true if there's more work, false if done
        return nextUnitOfWork != null;
      };

      // Schedule the rendering work
      const scheduler = this.schedulerProvider!.getScheduler();
      scheduler.scheduleTask(renderFunction, ImmediatePriority, 0, MainThread);
      scheduler.startWork();
      
    } catch (error) {
      console.error('FnecRenderer error:', error);
    }
  }

  static useState<T>(initial: T) {
    if (!this.schedulerProvider) {
        this.schedulerProvider = new SchedulerProvider();
      }
      if (!this.fiber) {
        this.fiber = new FiberBuilder();
      }
    return this.fiber!.UseState(initial);
  }

  static useInteractiveState<T>(initial: T) {
    if (!this.schedulerProvider) {
        this.schedulerProvider = new SchedulerProvider();
      }
      if (!this.fiber) {
        this.fiber = new FiberBuilder();
      }
    return this.fiber!.UseState(initial, true);
  }
}