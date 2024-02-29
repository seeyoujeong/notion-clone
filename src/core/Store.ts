import { ArrayItemType } from "@/types";

class Store<State = any> {
  _state: State;
  _observers: (() => void)[] = [];

  constructor(state: any) {
    this._state = state;
  }

  subscribe(fn: ArrayItemType<typeof this._observers>) {
    this._observers.push(fn);
  }

  getState() {
    return this._state;
  }

  setState(nextState: State) {
    this._state = nextState;
    this.notify();
  }

  notify() {
    this._observers.forEach((fn) => fn());
  }
}

export default Store;
