import { DocumentEdit } from "@/components";
import { Component } from "@/core";
import { notionApi, notionRouter, notionService } from "@/domain";

class Detail extends Component {
  mounted(): void {
    const documentId = Number(notionRouter.params.id);

    const documentEdit = new DocumentEdit({
      targetEl: document.querySelector("section")!,
      props: {
        writeDocument: notionService.updateDocument,
      },
    });

    (async () => {
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
