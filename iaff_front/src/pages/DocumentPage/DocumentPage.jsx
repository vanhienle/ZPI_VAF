import React, { useEffect } from "react";
import { getDocument } from "../../utils/Documents/getDocumentAPI";

const DocumentPage = () => {
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const result = await getDocument(1);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    handleFetchData();
  }, []);

  return <div></div>;
};

export default DocumentPage;
