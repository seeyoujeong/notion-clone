interface AppProps {
  targetEl: HTMLDivElement;
}

class App {
  constructor({ targetEl }: AppProps) {
    targetEl.innerHTML = "app";
  }
}

export default App;
