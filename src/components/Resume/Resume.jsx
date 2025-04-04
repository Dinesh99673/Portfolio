import React, { useState, useEffect } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import pdf from "../../assets/Dinesh_Chaudhari.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true); // Added state for loading

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-[#1a061a]">
      <div className="mb-14 rounded-lg max-w-[90%] md:max-w-5xl mt-14">
        <div className="mt-14 mb-14 w-full flex items-center justify-center">
          <button  className="flex items-center justify-center w-[60%] md:w-[30%] h-10 text-sm md:text-xl text-white shadow-inner shadow-purple-950 hover:bg-purple-600 bg-purple-700 rounded-sm">
            <AiOutlineDownload />
            <a href = {pdf} target = "_blank">&nbsp;Download CV</a>
          </button>
        </div>
        {loading && (
          <div className="flex items-center justify-center h-40">
            <div className="w-12 h-12 border-4 border-purple-500 border-dotted rounded-full animate-spin"></div>
          </div>
        )}
        <Document
          file={pdf}
          onLoadSuccess={() => setLoading(false)} // Hide loader when PDF is loaded
          onLoadError={() => setLoading(false)} // Also handle errors
        >
          {!loading && (
            <Page
              pageNumber={1}
              scale={width > 786 ? 1.6 : 0.6}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className="pdf-page rounded-sm overflow-hidden"
            />
          )}
        </Document>
        <div className="mt-14 mb-3 w-full flex items-center justify-center">
          <button  className="flex items-center justify-center w-[60%] md:w-[30%] h-10 text-sm md:text-xl text-white shadow-inner shadow-purple-950 hover:bg-purple-600 bg-purple-700 rounded-sm">
            <AiOutlineDownload />
            <a href = {pdf} target = "_blank">&nbsp;Download CV</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
