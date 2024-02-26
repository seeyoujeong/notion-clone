import { Component } from "./core";
import { notionRouter } from "./domain";

class App extends Component {
  template(): string {
    return `<main></main>`;
  }

  mounted(): void {
    notionRouter.init(document.querySelector("main")!);
  }
}

export default App;
