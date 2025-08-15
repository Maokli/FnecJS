import { TIME_SLICE_SIZE } from "./constants";
import { Task } from "./types/task";
import { TaskCallback } from "./types/taskCallback";
import { PriorityLevel } from "./types/taskPriority";

/*
* A stateful class that represents the scheduler.
*/
export class FnecScheduler {
  /* A queue for processing delayed tasks */
  timerQueue: Array<Task> = [];

  /* A queue for processing immidiate tasks, ie tasks ready to be started */
  tasksQueue: Array<Task> = [];

  /* An integer to track time */
  private timer: number = 0;

  private shouldYieldControlToBrowser() {
    return this.timer % TIME_SLICE_SIZE === 0;
  }

  scheduleTask(callback: TaskCallback, priority: PriorityLevel, timeout: number)
  {
    // So we can safely assume it will be always a number
    timeout = timeout ?? 0;

    const task: Task = {
      callback: callback,
      timeout: timeout,
      priority: priority,
      startTime: this.timer,
      expiryTime: this.timer + timeout
    } 

    if(timeout > 0)
      this.timerQueue.push(task)
    else
      this.tasksQueue.push(task)
    
    // TODO: call doWork
  }
}