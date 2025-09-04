import { Task } from "./types/task";

/**
 * This class handles managing time
 * and deciding what should happen at a given point in time
 */
export class TimingService {
    /* A variable used to track time */
    private time: number = 0;

    now(): number {
        return this.time;
    }

    /**
     * Starts counting time and doing work at each point of time
     * Basically initiates the scheduler.
     * @param timerQueue The queue containing delayed tasks
     * @param tasksQueue The queue containing ready to execute tasks
     */
    processQueues(timerQueue: Array<Task>, tasksQueue: Array<Task>) {
        this.moveDelayedTasksIfNeeded(timerQueue, tasksQueue);
        
        this.advanceTime();
    }

    private advanceTime() {
        this.time++;
    }

    /**
     * moves ready to process tasks from the timer queue to the tasks queue.
     */
    private moveDelayedTasksIfNeeded(timerQueue: Array<Task>, tasksQueue: Array<Task>)
    {
        const earliestDelayedTask = timerQueue[0];

        if(this.now() > earliestDelayedTask.expiryTime)
        {
            timerQueue.shift();
            tasksQueue.push(earliestDelayedTask)
        }
    }
}