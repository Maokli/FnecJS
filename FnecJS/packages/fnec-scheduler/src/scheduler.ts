import { TimingService } from "./timingService";
import { Task } from "./types/task";
import { TaskCallback } from "./types/taskCallback";
import { PriorityLevel } from "./types/taskPriority";
import { Thread } from "./types/taskThread";

/*
* A stateful class that represents the scheduler.
*/
export class FnecScheduler {
  /* A queue for processing delayed tasks sorted by earliest deadline first */
  timerQueue: Array<Task> = [];

  /* A queue for processing immidiate tasks sorted by priority, ie tasks ready to be started */
  tasksQueue: Array<Task> = [];

  /* An integer to track time */
  private timingService: TimingService = new TimingService();

  scheduleTask(callback: TaskCallback, priority: PriorityLevel, timeout: number, thread: Thread)
  {
    const currentTIme = this.timingService.now()

    const task: Task = {
      callback: callback,
      timeout: timeout,
      priority: priority,
      startTime: currentTIme,
      expiryTime: currentTIme + timeout,
      thread: thread
    } 

    if(timeout > 0)
      this.timerQueue.push(task)
    else
      this.tasksQueue.push(task)
  }
}