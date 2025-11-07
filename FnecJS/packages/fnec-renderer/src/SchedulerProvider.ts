import { FnecScheduler } from "fnec-scheduler";

export class SchedulerProvider {
    private static scheduler: FnecScheduler = new FnecScheduler();

    getScheduler(): FnecScheduler {
        return SchedulerProvider.scheduler;
    }
}