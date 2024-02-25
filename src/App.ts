import { Component } from "./core";
import { Home } from "./pages";

class App extends Component {
  template(): string {
    return `<main></main>`;
  }

  mounted(): void {
    new Home({ targetEl: document.querySelector("main")! });
  }
}

export default App;
