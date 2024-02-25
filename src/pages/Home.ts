import { DocumentList } from "@/components";
import { Component } from "@/core";
import { deleteDocument, getAllDocuments, postDocument } from "@/domain";

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
      state: [
        {
          id: 0,
          title: "test",
          documents: [],
        },
      ],
      props: {
        addDocument: async (parentId: number | null) => {
          await postDocument("새 제목", parentId);

          documentList.setState(await getAllDocuments());
        },
        deleteDocument: async (id: number) => {
          await deleteDocument(id);

          documentList.setState(await getAllDocuments());
        },
      },
    });

    (async () => {
      const list = await getAllDocuments();

      documentList.setState(list);
    })();
  }
}

export default Home;
