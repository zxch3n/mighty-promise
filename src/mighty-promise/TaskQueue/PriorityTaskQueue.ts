import { PriorityQueue } from "../../data-structure/PriorityQueue";
import { IInnerTask, ITask } from "./ITask";
import { TaskQueue, TaskQueueConfig } from "./TaskQueue";

export class PriorityTaskQueue<
  Task extends ITask<TaskReturn>,
  TaskReturn = void
> extends TaskQueue<TaskReturn> {
  constructor({
    compare,
    ...config
  }: TaskQueueConfig & {
    compare: (a: Task, b: Task) => number;
  }) {
    super(config);
    this.queue = new PriorityQueue<
      Task & Pick<IInnerTask<TaskReturn>, "reject" | "resolve">
    >(compare);
  }

  push(task: Task) {
    return super.push(task);
  }
}
