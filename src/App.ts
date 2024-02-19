interface AppProps {
  targetEl: HTMLDivElement;
}

class App {
  constructor({ targetEl }: AppProps) {
    targetEl.textContent = "App";
  }
}

export default App;
