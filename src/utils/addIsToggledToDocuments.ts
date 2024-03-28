import { DocumentListContent, RootDocument } from "@/types";

const addIsToggledToDocuments = (
  documents: RootDocument[],
  toggledList: number[]
): DocumentListContent[] => {
  return documents.map(({ id, title, documents }) => ({
    id,
    title,
    isToggled: toggledList.includes(id),
    documents:
      documents.length > 0
        ? addIsToggledToDocuments(documents, toggledList)
        : [],
  }));
};

export default addIsToggledToDocuments;
