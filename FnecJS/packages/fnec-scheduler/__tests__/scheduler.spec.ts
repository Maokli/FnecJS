import { FnecScheduler } from "../src/scheduler";
import { RessourceManagementUtils } from "../src/utils/ressourceUtils";
import { WorkLoop } from "../src/workLoop";

describe('Test scheduler', () => { 
    let scheduler: FnecScheduler;
    const defaultCallBack = () => false;

    beforeEach(() => {
        jest.clearAllMocks();
        scheduler = new FnecScheduler();
    })

    describe("Scheduler should process tasks", () => {
        let doWorkSpy: jest.SpyInstance;

        beforeEach(() => {
            doWorkSpy = jest.spyOn(WorkLoop.prototype, "doWork")
        })
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

    describe("Scheduler should process tasks and yield to host", () => {
        let shouldYieldToHostSpy: jest.SpyInstance;
        let yieldToHostSpy: jest.SpyInstance;

        beforeEach(() => {
            shouldYieldToHostSpy = jest.spyOn(RessourceManagementUtils, "shouldYieldToHost");
            yieldToHostSpy = jest.spyOn(RessourceManagementUtils, "yieldToHost");
        })

        test("Scheduler should process delayed and immidiate tasks", () =>  {
            // Arrange
            const totalTasks = 10;
            for(let i = 0; i < totalTasks; i++) {
                const timeout = i % 2 == 0 ? 0 : i +1;
                scheduler.scheduleTask(defaultCallBack, 0, timeout, 0);
            }

            // Act
            scheduler.startWork();

            // Assert
            expect(shouldYieldToHostSpy).toHaveBeenCalledTimes(totalTasks);
            expect(yieldToHostSpy).toHaveBeenCalledTimes(3);
        });
    });
 })