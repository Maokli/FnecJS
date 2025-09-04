import { BACKGROUND_TIME_SLICE_SIZE, MAIN_TIME_SLICE_SIZE } from "../constants";
import { MainThread, Thread } from "../types/taskThread";

export class RessourceManagementUtils {
    /**
     * Delegates control to the browser.
     * The browser can use the time delegated to him to
     * perform tasks such as rendering new UI.
     */
    static YieldToHost() {
        setTimeout(() => {});
    }

    static shouldYieldToHost(currentTime: number, lastHostControlTIme: number, thread: Thread) {
        const timeSliceSize = thread === MainThread ? MAIN_TIME_SLICE_SIZE : BACKGROUND_TIME_SLICE_SIZE;
        
        return currentTime - lastHostControlTIme >= timeSliceSize;
    }
}