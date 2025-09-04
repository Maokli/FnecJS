import { FnecScheduler } from "../src/scheduler";
import { WorkLoop } from "../src/workLoop";

describe('Test scheduler', () => { 
    let scheduler: FnecScheduler;
    let doWorkSpy: jest.SpyInstance;
    const defaultCallBack = () => false;

    beforeEach(() => {
        jest.clearAllMocks();
        scheduler = new FnecScheduler();
        doWorkSpy = jest.spyOn(WorkLoop.prototype, "doWork")
    })

    describe("Scheduler should process tasks", () => {
        test("Scheduler should process all immidiate tasks", () =>  {
            // Arrange
            const totalTasks = 3;
            for(let i = 0; i < totalTasks; i++) {
                scheduler.scheduleTask(defaultCallBack, 0, 0, 0);
            }

            // Act
            scheduler.startWork();

            // Assert
            expect(doWorkSpy).toHaveBeenCalledTimes(totalTasks);
        });

        test("Scheduler should process all delayed tasks", () =>  {
            // Arrange
            const totalTasks = 3;
            for(let i = 0; i < totalTasks; i++) {
                scheduler.scheduleTask(defaultCallBack, 0, i+1, 0);
            }

            // Act
            scheduler.startWork();

            // Assert
            expect(doWorkSpy).toHaveBeenCalledTimes(totalTasks);
        });

        test("Scheduler should process delayed and immidiate tasks", () =>  {
            // Arrange
            const totalTasks = 3;
            for(let i = 0; i < totalTasks; i++) {
                const timeout = i % 2 == 0 ? 0 : i +1;
                scheduler.scheduleTask(defaultCallBack, 0, timeout, 0);
            }

            // Act
            scheduler.startWork();

            // Assert
            expect(doWorkSpy).toHaveBeenCalledTimes(totalTasks);
        });
    });
    
 })