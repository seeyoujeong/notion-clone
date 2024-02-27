import { DocumentEdit, DocumentList } from "@/components";
import { Component } from "@/core";
import { notionApi, notionRouter } from "@/domain";

class Detail extends Component {
  template(): string {
    return `
      <aside></aside>
      <section></section>
    `;
  }

  mounted(): void {
    const documentId = Number(notionRouter.getParams().id);

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

          if (documentId === id) {
            history.replaceState({}, "", "/");
            notionRouter.navigate(location.pathname);
          }
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
          await notionApi.putDocument(id, { title, content });

          documentList.setState(await notionApi.getAllDocuments());
        },
      },
    });

    (async () => {
      const list = await notionApi.getAllDocuments();

      documentList.setState(list);

      try {
        const { title, content } = await notionApi.getDocumentContent(
          documentId
        );

        documentEdit.setState({ title, content });
      } catch (err) {
        alert("없는 문서입니다.");
      }
    })();
  }
}

export default Detail;
