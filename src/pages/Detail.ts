import { DocumentEdit, DocumentList } from "@/components";
import { Component } from "@/core";
import {
  deleteDocument,
  getAllDocuments,
  getDocumentContent,
  notionRouter,
  postDocument,
  putDocument,
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

    const documentEdit = new DocumentEdit({
      targetEl: document.querySelector("section")!,
      props: {
        writeDocument: async (id, title, content) => {
          await putDocument(id, { title, content });

          documentList.setState(await getAllDocuments());
        },
      },
    });

    (async () => {
      const list = await getAllDocuments();

      documentList.setState(list);

      const { title, content } = await getDocumentContent(
        Number(notionRouter.getParams().id)
      );

      documentEdit.setState({ title, content });
    })();
  }
}

export default Detail;
