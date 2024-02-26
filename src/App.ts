import { Component } from "./core";
import { notionRouter } from "./domain";

class App extends Component {
  template(): string {
    return `<main></main>`;
  }

  mounted(): void {
    const targetEl = document.querySelector("main")!;

    notionRouter(location.pathname, targetEl);
  }
}

export default App;
