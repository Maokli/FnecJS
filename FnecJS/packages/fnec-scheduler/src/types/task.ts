import { TaskCallback } from "./taskCallback"
import { PriorityLevel } from "./taskPriority"
import { Thread } from "./taskThread"

export type Task = {
  callback: TaskCallback
  timeout: number
  priority: PriorityLevel
  startTime: number
  expiryTime: number
  thread: Thread
}