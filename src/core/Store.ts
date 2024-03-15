import { ArrayItemType } from "@/types";

class Store<State = any> {
  private state: State;
  private observers: (() => void)[] = [];

  constructor(state: State) {
    this.state = state;
  }

  subscribe(fn: ArrayItemType<typeof this.observers>) {
    this.observers.push(fn);
  }

  getState() {
    return this.state;
  }

  setState(nextState: State) {
    this.state = nextState;
    this.notify();
  }

  notify() {
    this.observers.forEach((fn) => fn());
  }
}

export default Store;
