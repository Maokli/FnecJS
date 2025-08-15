import { TaskCallback } from "./taskCallback"
import { PriorityLevel } from "./taskPriority"

export type Task = {
  callback: TaskCallback
  timeout: number
  priority: PriorityLevel
  startTime: number
  expiryTime: number
}