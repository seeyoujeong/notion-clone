import { DocumentList } from "@/components";
import { Component } from "@/core";
import { notionApi, notionRouter } from "@/domain";

class Home extends Component {
  template(): string {
    return `
      <aside></aside>
      <section></section>
    `;
  }

  mounted(): void {
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
        },
        moveDetailPage: async (id: number) => {
          history.pushState({}, "", String(id));
          notionRouter.navigate(location.pathname);
        },
      },
    });

    (async () => {
      const list = await notionApi.getAllDocuments();

      documentList.setState(list);
    })();
  }
}

export default Home;
