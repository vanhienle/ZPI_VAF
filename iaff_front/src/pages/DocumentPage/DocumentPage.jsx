import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDocument } from "../../utils/Documents/getDocumentAPI";

import Loading from "../../components/Spinner/Loading";

const DocumentPage = () => {
  const { id } = useParams();

  const [document, setDocument] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDocumentData = async () => {
      try {
        const result = await getDocument(id);
        setDocument(result);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error with getting Data about Document: " + error.message
        );
      }
    };

    getDocumentData();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      {isLoading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <Loading width={100} height={100} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-1/2 max-lg:w-3/4 space-y-10 animate-fade-in">
          {/* Document Title */}
          <h1 className="text-3xl max-xl:text-2xl max-lg:text-xl max-md:text-base text-text-color font-bold">
            {document.title}
          </h1>

          {/* Document Image */}
          <img
            src={document.image}
            alt="document"
            className="object-cover w-3/4 shadow-lg rounded-xl"
          />

          {/* Delimiter */}
          <div className="border w-full border-text-color rounded-lg"></div>

          {/* Document's Short Description */}
          <p className="text-xl max-lg:text-lg max-md:text-sm font-bold text-center text-accent-300">
            {document.short}
          </p>

          {/* Delimiter */}
          <div className="border w-full border-text-color rounded-lg"></div>

          {/* Document's Information */}
          <p
            dangerouslySetInnerHTML={{
              __html: document.info
                .replace(/\n/g, "<br>")
                .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"),
            }}
            className="text-lg max-xl:text-base max-md:text-sm"
          ></p>

          {/* Delimiter */}
          <div className="border w-full border-text-color rounded-lg"></div>

          {/* Useful Links Block */}
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
            className="text-lg max-xl:text-base max-md:text-sm w-full"
          ></p>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
