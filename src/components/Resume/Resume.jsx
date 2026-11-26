import { lazy, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import pdf from "../../assets/Dinesh-Chaudhari-Resume.pdf";
import SectionHeading from "../SectionHeading";
import ClientOnly from "../ClientOnly";
import { PdfSpinner } from "./PdfSpinner";

// react-pdf + pdf.js only ever load in the browser, after hydration.
const ResumeViewer = lazy(() => import("./ResumeViewer"));

const DownloadButton = () => (
  <a
    href={pdf}
    download="Dinesh-Chaudhari-Resume.pdf"
    className="flex items-center justify-center gap-2 px-6 h-11 text-sm md:text-lg font-semibold text-ink bg-copper hover:bg-copper-bright rounded-sm transition-colors"
  >
    <AiOutlineDownload aria-hidden="true" />
    Download CV
  </a>
);

const Resume = () => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="w-full min-h-screen px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto mt-14">
        <SectionHeading
          as="h1"
          label="Resume"
          title="Dinesh Chaudhari – Professional Resume"
          sub="Links in the document are live — click any of them to open."
        />

        <div className="w-full flex items-center justify-center mb-10">
          <DownloadButton />
        </div>

        <ClientOnly
          fallback={
            <div className="w-full flex flex-col items-center">
              <PdfSpinner />
            </div>
          }
        >
          <ResumeViewer onFailed={() => setFailed(true)} />
        </ClientOnly>

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
