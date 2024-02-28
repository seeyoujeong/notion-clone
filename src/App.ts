import { Component } from "./core";
import { notionRouter } from "./domain";
import { browserHistory } from "./services";

class App extends Component {
  template(): string {
    return `<main></main>`;
  }

  mounted(): void {
    notionRouter.init(document.querySelector("main")!);
    browserHistory.init(() => notionRouter.navigate(location.pathname));
  }
}

export default App;
