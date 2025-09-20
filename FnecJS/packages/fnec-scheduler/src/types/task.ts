import { TaskCallback } from "./taskCallback"
import { PriorityLevel } from "fnec-shared/src/types/taskPriority"
import { Thread } from "fnec-shared/src/types/taskThread"

export type Task = {
  callback: TaskCallback
  timeout: number
  priority: PriorityLevel
  startTime: number
  expiryTime: number
  thread: Thread
}