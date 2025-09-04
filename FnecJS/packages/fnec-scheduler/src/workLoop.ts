import { Task } from "./types/task";

export class WorkLoop {
    /**
     * Performs a units of work and determines if there is still work to do.
     * @param tasksQueue The queue of ready to be executed tasks.
     * @returns True if there is more work to do, false if not.
     */
    DoWork(tasksQueue: Array<Task>): boolean {
        if(!this.HasMoreWorkToDo(tasksQueue))
            return false;

        const highestPriorityTask = tasksQueue[0];
        const hasContinuation = highestPriorityTask.callback();

        if(!hasContinuation)
            tasksQueue.shift();

        return this.HasMoreWorkToDo(tasksQueue);
    }

    private HasMoreWorkToDo(tasksQueue: Array<Task>)
    {
        return tasksQueue.length > 0;
    }
}