interface ComponentProps<Props = {}, State = {}> {
  targetEl: HTMLElement;
  props?: Props;
  state?: State;
}

class Component<Props = {}, State = {}> {
  protected targetEl: HTMLElement;
  protected props?: Props;
  protected state?: State;

  constructor({ targetEl, props, state }: ComponentProps<Props, State>) {
    this.targetEl = targetEl;
    this.props = props;
    this.state = state;

    this.setEvent();
    this.render();
  }

  template() {
    return "";
  }

  mounted() {}

  render() {
    this.targetEl.innerHTML = this.template();
    this.mounted();
  }

  setState(nextState: State) {
    this.state = nextState;
    this.render();
  }

  setEvent() {}

  addEvent(
    type: keyof HTMLElementEventMap,
    callback: (element: HTMLElement) => void
  ) {
    this.targetEl.addEventListener(type, (event) => {
      callback(event.target as HTMLElement);
    });
  }
}

export default Component;
