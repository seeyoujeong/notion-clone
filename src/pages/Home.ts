import { DocumentList } from "@/components";
import { Component } from "@/core";
import { getAllDocuments } from "@/domain";

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
    });

    (async () => {
      const list = await getAllDocuments();

      documentList.setState(list);
    })();
  }
}

export default Home;
