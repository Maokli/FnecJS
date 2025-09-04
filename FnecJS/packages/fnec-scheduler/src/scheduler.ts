import { TimingService } from "./timingService";
import { Task } from "./types/task";
import { TaskCallback } from "./types/taskCallback";
import { PriorityLevel } from "./types/taskPriority";
import { Thread } from "./types/taskThread";
import { WorkLoop } from "./workLoop";

/*
* A stateful class that represents the scheduler.
*/
export class FnecScheduler {
  /** A queue for processing delayed tasks sorted by earliest deadline first */
  private timerQueue: Array<Task> = [];

  /** A queue for processing immidiate tasks sorted by priority, ie tasks ready to be started */
  private tasksQueue: Array<Task> = [];

  /** The service that handles time */
  private timingService: TimingService = new TimingService();

  /** The service that handles executing tasks and dequeueing them */
  private workLoop: WorkLoop = new WorkLoop();

  scheduleTask(callback: TaskCallback, priority: PriorityLevel, timeout: number, thread: Thread)
  {
    const currentTIme = this.timingService.now();

    const task: Task = {
      callback: callback,
      timeout: timeout,
      priority: priority,
      startTime: currentTIme,
      expiryTime: currentTIme + timeout,
      thread: thread
    }

    if(timeout > 0)
      this.timerQueue.push(task);
    else
      this.tasksQueue.push(task);
  }

  startWork() {
    while(this.tasksQueue.length > 0 && this.timerQueue.length > 0) {
      this.timingService.advanceTime(this.timerQueue, this.tasksQueue);
      this.workLoop.DoWork(this.tasksQueue);
    }
  }
}