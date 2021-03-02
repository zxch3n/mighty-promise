import { throwIfTimeout } from "../utils/timeout";
import { LinkedPromise } from "./LinkedPromise";

type ReleaseFunction = () => void;
export class Lock {
  private linkedPromise: LinkedPromise = new LinkedPromise();

  acquire(timeout?: number): Promise<ReleaseFunction> {
    if (!timeout) {
      return this.linkedPromise.pushTask();
    }

    return throwIfTimeout(this.linkedPromise.pushTask(), timeout);
  }

  acquireImmediately(timeout?: number): Promise<ReleaseFunction> {
    if (!timeout) {
      return this.linkedPromise.pushTaskFront();
    }

    return throwIfTimeout(this.linkedPromise.pushTaskFront(), timeout);
  }
}
