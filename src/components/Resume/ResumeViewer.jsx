import { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { PdfSpinner } from "./PdfSpinner";

/*
 * Browser-only: react-pdf / pdf.js need DOM, canvas and a Web Worker.
 * Loaded lazily from Resume.jsx via <ClientOnly>, so it is never
 * imported during prerendering and stays out of the main bundle.
 */
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MAX_PAGE_WIDTH = 900;

const ResumeViewer = ({ file, onFailed }) => {
  const [numPages, setNumPages] = useState(null);
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
    <div ref={wrapRef} className="w-full flex flex-col items-center">
      <Document
        file={file}
        onLoadSuccess={onLoad}
        onLoadError={onFailed}
        externalLinkTarget="_blank"
        externalLinkRel="noopener noreferrer"
        loading={<PdfSpinner />}
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
  );
};

export default ResumeViewer;
