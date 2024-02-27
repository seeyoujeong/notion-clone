import { DocumentEdit, DocumentList } from "@/components";
import { Component } from "@/core";
import {
  deleteDocument,
  getAllDocuments,
  notionRouter,
  postDocument,
} from "@/domain";

class Detail extends Component {
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
          await postDocument("새 제목", parentId);

          documentList.setState(await getAllDocuments());
        },
        deleteDocument: async (id: number) => {
          await deleteDocument(id);

          documentList.setState(await getAllDocuments());
        },
        moveDetailPage: async (id: number) => {
          history.pushState({}, "", String(id));
          notionRouter.navigate(location.pathname);
        },
      },
    });

    new DocumentEdit({
      targetEl: document.querySelector("section")!,
    });

    (async () => {
      const list = await getAllDocuments();

      documentList.setState(list);
    })();
  }
}

export default Detail;
