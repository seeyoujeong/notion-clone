import { DocumentEdit } from "@/components";
import { Component } from "@/core";
import { notionApi, notionRouter } from "@/domain";
import { browserHistory } from "@/services";

class Detail extends Component {
  template(): string {
    return `
      <div class="detail"></div>
    `;
  }

  mounted(): void {
    const documentId = Number(notionRouter.params.id);

    const documentEdit = new DocumentEdit({
      targetEl: document.querySelector(".detail")!,
    });

    (async () => {
      try {
        const { title, content } = await notionApi.getDocumentContent(
          documentId
        );

        documentEdit.setState({ title, content });
      } catch (err) {
        alert("없는 문서입니다.");
        browserHistory.replace("/");
      }
    })();
  }
}

export default Detail;
