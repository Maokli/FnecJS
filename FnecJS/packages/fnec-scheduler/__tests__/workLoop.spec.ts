import { Task } from "../src/types/task";
import { WorkLoop } from "../src/workLoop"

describe("Testing WorkLoop", () => { 
    let workLoop: WorkLoop;

    beforeEach(() => {
        workLoop = new WorkLoop();
    })

    test("WorkLoop should do anything when empty queue", () => {
        // Arrange
        const emptyQueue = [];
        
        // Act
        const result = workLoop.DoWork(emptyQueue);

        // Assert
        expect(result).toBe(false);
    })

    describe("WorkLoop should process task", () => {
        test("Workloop should remove task when it's done", () => {
            // Arrange
            const taskWithNoContinuation: Task = {
                callback: () => false,
                timeout: 0,
                priority: 0,
                startTime: 0,
                expiryTime: 0,
                thread: 0
            }
            const queue = [taskWithNoContinuation];

            // Act
            const result = workLoop.DoWork(queue);

            // Assert
            expect(result).toBe(false);
            expect(queue.length).toBe(0);
        });

        test("Workloop should not remove task when it's not done", () => {
            // Arrange
            const taskWithNoContinuation: Task = {
                callback: () => true,
                timeout: 0,
                priority: 0,
                startTime: 0,
                expiryTime: 0,
                thread: 0
            }
            const queue = [taskWithNoContinuation];

            // Act
            const result = workLoop.DoWork(queue);

            // Assert
            expect(result).toBe(true);
            expect(queue.length).toBe(1);
        });
    })
 })