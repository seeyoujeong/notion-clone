import { DocumentList } from "./components";
import { Component } from "./core";
import { notionApi, notionRouter } from "./domain";
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

    const documentList = new DocumentList({
      targetEl: document.querySelector("aside")!,
      props: {
        addDocument: async (parentId: number | null) => {
          await notionApi.postDocument("새 제목", parentId);

          documentList.setState(await notionApi.getAllDocuments());
        },
        deleteDocument: async (id: number) => {
          await notionApi.deleteDocument(id);

          documentList.setState(await notionApi.getAllDocuments());

          if (Number(notionRouter.params.id) === id) {
            browserHistory.replace("/");
          }
        },
        moveDetailPage: async (id: number) => {
          browserHistory.push(String(id));
        },
      },
    });

    (async () => {
      const list = await notionApi.getAllDocuments();

      documentList.setState(list);
    })();
  }
}

export default App;
