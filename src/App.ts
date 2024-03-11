import { DocumentList, Header } from "./components";
import { Component } from "./core";
import { notionRouter, notionService } from "./domain";
import { browserHistory } from "./services";

class App extends Component {
  template(): string {
    return `
      <main>
        <aside>
          <header></header>
          <nav></nav>
        </aside>
        <section></section>
      </main>
    `;
  }

  mounted(): void {
    notionRouter.init(document.querySelector("section")!);
    browserHistory.init(() => notionRouter.navigate(location.pathname));

    new Header({ targetEl: document.querySelector("header")! });
    new DocumentList({ targetEl: document.querySelector("nav")! });

    notionService.getDocumentList();
  }
}

export default App;
