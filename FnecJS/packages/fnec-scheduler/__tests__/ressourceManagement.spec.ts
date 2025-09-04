import { BackgroundThread, MainThread } from "../src/types/taskThread";
import { RessourceManagementUtils } from "../src/utils/ressourceUtils";

describe("Testing ressource management utilities", () => {
    let setTimeoutSpy: jest.SpyInstance;

    beforeEach(() => {
        setTimeoutSpy = jest.spyOn(window, "setTimeout");
    })

    test("YieldToHost should call setTimeout", () => {
        // Act
        RessourceManagementUtils.YieldToHost();

        // Assert
        expect(setTimeoutSpy).toHaveBeenCalled();
    });

    describe("Test SHouldYieldToHost", () => {
        describe("ShouldYieldToHost should return true", () => {
            test("After 5ms for background thread", () => {
                // Arrange
                const thread = BackgroundThread;
                const lastHostControlTIme = 5;
                const current = 10;

                //Act
                const result = RessourceManagementUtils.shouldYieldToHost(current, lastHostControlTIme, thread);

                // Assert
                expect(result).toEqual(true);
            });

            test("After more than 5ms for background thread", () => {
                // Arrange
                const thread = BackgroundThread;
                const lastHostControlTIme = 5;
                const current = 13;

                //Act
                const result = RessourceManagementUtils.shouldYieldToHost(current, lastHostControlTIme, thread);

                // Assert
                expect(result).toEqual(true);
            });

            test("After 3ms for Main thread", () => {
                // Arrange
                const thread = MainThread;
                const lastHostControlTIme = 5;
                const current = 8;

                //Act
                const result = RessourceManagementUtils.shouldYieldToHost(current, lastHostControlTIme, thread);

                // Assert
                expect(result).toEqual(true);
            });

            test("After more than 3ms for Main thread", () => {
                // Arrange
                const thread = MainThread;
                const lastHostControlTIme = 5;
                const current = 10;

                //Act
                const result = RessourceManagementUtils.shouldYieldToHost(current, lastHostControlTIme, thread);

                // Assert
                expect(result).toEqual(true);
            });
        });

        describe("ShouldYieldToHost should return false", () => {
            test("Before 5ms for background thread", () => {
                // Arrange
                const thread = BackgroundThread;
                const lastHostControlTIme = 5;
                const current = 8;

                //Act
                const result = RessourceManagementUtils.shouldYieldToHost(current, lastHostControlTIme, thread);

                // Assert
                expect(result).toEqual(false);
            });

            test("Before 3ms for Main thread", () => {
                // Arrange
                const thread = MainThread;
                const lastHostControlTIme = 5;
                const current = 6;

                //Act
                const result = RessourceManagementUtils.shouldYieldToHost(current, lastHostControlTIme, thread);

                // Assert
                expect(result).toEqual(false);
            });
        });
    })
})