import { TimingService } from "../src/timingService"
import { Task } from "../src/types/task";

describe("Testing TimingService", () => {
    let timingService: TimingService;
    let timerQueue: Array<Task>;
    let tasksQueue: Array<Task>;

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        timingService = new TimingService();
        timerQueue = [];
        tasksQueue = [];
    })

    test("Test initialization", () => {
        expect(timingService).not.toBeNull();
        expect(timingService.now()).toBe(0);
    })

    test("Should move delayed tasks", () => {
        // Arrange
        const delayedTask: Task = {
            callback: () => false,
            timeout: 0,
            priority: 0,
            startTime: 0,
            expiryTime: 5,
            thread: 0
        }
        jest.spyOn(timingService, "now").mockReturnValue(delayedTask.expiryTime + 3)
        timerQueue.push(delayedTask);

        // Act
        timingService.advanceTime(timerQueue, tasksQueue);

        // Assert
        expect(timerQueue.length).toBe(0);
        expect(tasksQueue).toContain(delayedTask);
    });

    test("Should move multiple delayed tasks", () => {
        // Arrange
        const delayedTask1: Task = {
            callback: () => false,
            timeout: 0,
            priority: 0,
            startTime: 0,
            expiryTime: 5,
            thread: 0
        }
        const delayedTask2: Task = {
            callback: () => false,
            timeout: 0,
            priority: 0,
            startTime: 0,
            expiryTime: 7,
            thread: 0
        }
        jest.spyOn(timingService, "now").mockReturnValue(delayedTask2.expiryTime + 3);
        timerQueue.push(delayedTask1);
        timerQueue.push(delayedTask2);

        // Act
        timingService.advanceTime(timerQueue, tasksQueue);

        // Assert
        expect(timerQueue.length).toBe(1);
        expect(tasksQueue).toContain(delayedTask1);

        // Act
        timingService.advanceTime(timerQueue, tasksQueue);

        // Assert
        expect(timerQueue.length).toBe(0);
        expect(tasksQueue).toContain(delayedTask1);
        expect(tasksQueue).toContain(delayedTask2);
    });
})