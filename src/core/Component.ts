interface Elements {
  parent: HTMLElement;
  target: HTMLElement;
}

interface ComponentProps<Props = {}, State = {}> {
  elements: Elements;
  props?: Props;
  state?: State;
}

class Component<Props = {}, State = {}> {
  protected targetEl: HTMLElement;
  protected props?: Props;
  protected state?: State;

  constructor({ elements, props, state }: ComponentProps<Props, State>) {
    this.targetEl = elements.target;
    elements.parent.append(this.targetEl);

    this.props = props;
    this.state = state;

    this.render();
  }

  template() {
    return "";
  }

  render() {
    this.targetEl.innerHTML = this.template();
  }

  setState(nextState: State) {
    this.state = nextState;
    this.render();
  }
}

export default Component;
