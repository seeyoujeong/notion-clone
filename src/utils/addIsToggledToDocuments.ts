import { toggledStorage } from "@/domain";
import { DocumentListContent, RootDocument } from "@/types";

const addIsToggledToDocuments = (
  documents: RootDocument[]
): DocumentListContent[] => {
  return documents.map(({ id, title, documents }) => ({
    id,
    title,
    isToggled: toggledStorage.has(id),
    documents: documents.length > 0 ? addIsToggledToDocuments(documents) : [],
  }));
};

export default addIsToggledToDocuments;
