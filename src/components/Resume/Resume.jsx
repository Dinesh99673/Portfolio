import React, { useState, useEffect, useRef, useCallback } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import pdf from "../../assets/Dinesh-Chaudhari-Resume.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import SectionHeading from "../SectionHeading";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MAX_PAGE_WIDTH = 900;

const DownloadButton = () => (
  <a
    href={pdf}
    download="Dinesh-Chaudhari-Resume.pdf"
    className="flex items-center justify-center gap-2 px-6 h-11 text-sm md:text-lg font-semibold text-ink bg-copper hover:bg-copper-bright rounded-sm transition-colors"
  >
    <AiOutlineDownload />
    Download CV
  </a>
);

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [failed, setFailed] = useState(false);
  const [pageWidth, setPageWidth] = useState(MAX_PAGE_WIDTH);
  const wrapRef = useRef(null);

  // Size the pages to the container rather than a fixed scale, so the text
  // and link layers stay aligned with the canvas at every breakpoint.
  useEffect(() => {
    const measure = () => {
      const available = wrapRef.current?.clientWidth;
      if (available) setPageWidth(Math.min(available, MAX_PAGE_WIDTH));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const onLoad = useCallback(({ numPages: total }) => setNumPages(total), []);

  return (
    <div className="w-full min-h-screen px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto mt-14">
        <SectionHeading
          label="Resume"
          title="Resume"
          sub="Links in the document are live — click any of them to open."
        />

        <div className="w-full flex items-center justify-center mb-10">
          <DownloadButton />
        </div>

        <div ref={wrapRef} className="w-full flex flex-col items-center">
          <Document
            file={pdf}
            onLoadSuccess={onLoad}
            onLoadError={() => setFailed(true)}
            externalLinkTarget="_blank"
            externalLinkRel="noopener noreferrer"
            loading={
              <div className="flex items-center justify-center h-40">
                <div className="w-12 h-12 border-4 border-copper border-dotted rounded-full animate-spin"></div>
              </div>
            }
            error={
              <p className="font-mono text-sm text-ash py-10 text-center">
                The resume preview could not load. Use Download CV above to open the PDF.
              </p>
            }
          >
            {Array.from({ length: numPages ?? 0 }, (_, i) => (
              <div key={i} className="mb-8">
                <Page
                  pageNumber={i + 1}
                  width={pageWidth}
                  renderAnnotationLayer
                  renderTextLayer
                  className="pdf-page rounded-sm overflow-hidden border border-seam"
                />
                {numPages > 1 && (
                  <p className="font-mono text-xs text-ash text-center mt-3">
                    Page {i + 1} of {numPages}
                  </p>
                )}
              </div>
            ))}
          </Document>
        </div>

        {!failed && (
          <div className="mt-6 mb-3 w-full flex items-center justify-center">
            <DownloadButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
