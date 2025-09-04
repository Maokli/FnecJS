import { Task } from "./types/task";
import { RessourceManagementUtils } from "./utils/ressourceUtils";

/**
 * This class handles managing time
 * and deciding what should happen at a given point in time
 */
export class TimingService {
    /** A variable used to track time */
    private time: number = 0;
    
    /** The last time host took control */
    private lastHostControlTime = 0;

    now(): number {
        return this.time;
    }

    /**
     * Starts counting time and doing work at each point of time
     * Basically initiates the scheduler.
     * @param timerQueue The queue containing delayed tasks
     * @param tasksQueue The queue containing ready to execute tasks
     */
    advanceTime(timerQueue: Array<Task>, tasksQueue: Array<Task>) {
        this.moveDelayedTasksIfNeeded(timerQueue, tasksQueue);
        
        this.time++;
        
        this.delegateToHostIfNeeded(tasksQueue);
    }

    /**
     * moves ready to process tasks from the timer queue to the tasks queue.
     */
    private moveDelayedTasksIfNeeded(timerQueue: Array<Task>, tasksQueue: Array<Task>)
    {
        if(timerQueue.length === 0)
            return;

        const earliestDelayedTask = timerQueue[0];

        if(this.now() > earliestDelayedTask.expiryTime)
        {
            timerQueue.shift();
            tasksQueue.push(earliestDelayedTask)
        }
    }

    private delegateToHostIfNeeded(tasksQueue: Array<Task>) {
        if(tasksQueue.length == 0) {
            return;
        }

        const currentTask = tasksQueue[0];
        if(RessourceManagementUtils.shouldYieldToHost(this.now(), this.lastHostControlTime, currentTask.thread)) {
            this.lastHostControlTime = this.now();
            RessourceManagementUtils.yieldToHost();
        }
    }
}