import { DocumentList } from "./components";
import { Component } from "./core";
import {
  documentListStore,
  notionApi,
  notionRouter,
  notionService,
} from "./domain";
import { browserHistory } from "./services";

class App extends Component {
  template(): string {
    return `
      <main>
        <aside></aside>
        <section></section>
      </main>
    `;
  }

  mounted(): void {
    notionRouter.init(document.querySelector("section")!);
    browserHistory.init(() => notionRouter.navigate(location.pathname));

    new DocumentList({
      targetEl: document.querySelector("aside")!,
      props: {
        addDocument: notionService.addDocument,
        deleteDocument: notionService.deleteDocument,
        moveDetailPage: notionService.moveDetailPage,
      },
    });

    (async () => {
      const list = await notionApi.getAllDocuments();

      documentListStore.setState(list);
    })();
  }
}

export default App;
