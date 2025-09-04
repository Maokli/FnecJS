# fnec-scheduler

A lightweight cooperative task scheduler designed for **FnecJS**, inspired by React’s scheduler.
It manages **immediate** and **delayed tasks**, executes them in a **work loop**, and yields control back to the host (browser/event loop) to ensure responsiveness.

---

## ✨ Features

* 🕒 **Time-based scheduling**
  Schedule tasks with optional delays and priorities.

* ⚡ **Immediate & delayed task queues**

  * Immediate tasks are executed right away.
  * Delayed tasks are moved into the execution queue once their timeout expires.

* 🎚️ **Priority levels**
  Supports multiple priority levels (`Immediate`, `UserBlocking`, `Normal`, `Low`, `Idle`).

* 🔀 **Thread-aware execution**
  Differentiates between **MainThread** (UI-critical) and **BackgroundThread** work.

* 🛑 **Cooperative yielding**
  Uses **time slicing** (`3ms` for main thread, `5ms` for background thread) to yield control back to the browser.

* ✅ **Tested with Jest**
  Includes comprehensive unit tests for all modules (`Scheduler`, `TimingService`, `WorkLoop`, `Resource Management`).

---

## 📦 Installation

Since this is part of the **FnecJS monorepo**, it can be imported as:

```ts
import { FnecScheduler } from "@fnec/scheduler";
```

---

## 🚀 Usage

### Basic Example

```ts
import { FnecScheduler } from "@fnec/scheduler";
import { ImmediatePriority, MainThread } from "@fnec/scheduler/types/taskPriority";

const scheduler = new FnecScheduler();

// Schedule an immediate task
scheduler.scheduleTask(() => {
  console.log("Running immediate task");
  return false; // no continuation
}, ImmediatePriority, 0, MainThread);

// Start processing tasks
scheduler.startWork();
```

---

## 🛠️ Core Concepts

### `FnecScheduler`

* Manages **two queues**:

  * `timerQueue`: delayed tasks waiting for expiry.
  * `tasksQueue`: ready-to-run tasks.
* Responsible for **scheduling tasks** and **driving the work loop**.

### `TimingService`

* Tracks **virtual time**.
* Moves expired tasks from `timerQueue` → `tasksQueue`.
* Delegates back to host if tasks run too long.

### `WorkLoop`

* Executes tasks from the queue.
* Removes finished tasks (`callback` returned `false`).
* Keeps unfinished tasks (`callback` returned `true`).

### `RessourceManagementUtils`

* `shouldYieldToHost`: checks if the scheduler should yield.
* `yieldToHost`: delegates control back to the browser with `setTimeout`.

---

## 🎛️ API Reference

### `scheduleTask(callback, priority, timeout, thread)`

Schedules a new task.

* `callback: () => boolean` → Function to execute. Returns `true` if continuation is required, `false` otherwise.
* `priority: PriorityLevel` → Task priority (`0–5`).
* `timeout: number` → Delay before execution.
* `thread: Thread` → `MainThread` or `BackgroundThread`.

---

### `startWork()`

Starts processing both **immediate** and **delayed** tasks until queues are empty.

---

## 🧪 Testing

Run unit tests with:

```bash
npm test
```

Covers:

* Scheduler behavior (delayed & immediate tasks).
* Timing service task migration.
* Work loop continuation logic.
* Yielding to host at correct intervals.

---

## 📂 Project Structure

```
fnec-scheduler/
 ├── src/
 │   ├── scheduler.ts
 │   ├── timingService.ts
 │   ├── workLoop.ts
 │   ├── utils/ressourceUtils.ts
 │   └── types/
 │       ├── task.ts
 │       ├── taskCallback.ts
 │       ├── taskPriority.ts
 │       └── taskThread.ts
 ├── __tests__/   # Jest unit tests
 └── index.ts     # Package entry
```

---

## 🔮 Future Improvements

* Priority-based task ordering inside queues.
* Support for **cancellation** of scheduled tasks.
* Integration with **FnecJS renderer** for smoother UI updates.

## 📄 License

MIT — free to use, modify, and distribute.

---

Made with 🦊 in Tunisia 🇹🇳.