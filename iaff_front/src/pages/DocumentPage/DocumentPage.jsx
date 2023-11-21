import React, { useEffect, useState } from "react";
import { getDocument } from "../../utils/Documents/getDocumentAPI";
import { useParams } from "react-router-dom";
import documentImage from "../../assets/images/documents.jpg";
import Loading from "../../components/Spinner/Loading";

const DocumentPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const result = await getDocument(id);
        setDocument(result);
        setIsLoading(false);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      handleFetchData();
    }, 1000);
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      {isLoading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <Loading width={100} height={100} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-1/2 space-y-10 animate-fade-in">
          <h1 className="text-3xl text-text-color font-bold">
            {document.title}
          </h1>
          <img
            src={documentImage}
            alt="document"
            className="object-cover w-3/4 shadow-lg rounded-xl"
          />
          <div className="border w-full border-text-color rounded-lg"></div>
          <p className="text-xl font-bold text-center text-accent-300">
            {document.short}
          </p>
          <div className="border w-full border-text-color rounded-lg"></div>
          <p
            dangerouslySetInnerHTML={{
              __html: document.info
                .replace(/\n/g, "<br>")
                .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"),
            }}
            className="text-lg"
          ></p>
          <div className="border w-full border-text-color rounded-lg"></div>
          <p
            dangerouslySetInnerHTML={{
              __html: document.links
                .replace(/\n/g, "<br>")
                .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
                .replace(
                  /(?:https?|ftp):\/\/(?:(?!<br>)[\n\S])+/g,
                  (match) =>
                    `<a class="text-primary-700 hover:text-primary-500" href="${match}" target="_blank">${match}</a>`
                ),
            }}
            className="text-lg w-full"
          ></p>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
