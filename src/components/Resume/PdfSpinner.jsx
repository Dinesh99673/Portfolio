// Shared by the prerendered placeholder and react-pdf's own loading state,
// so the swap from one to the other is seamless.
export const PdfSpinner = () => (
  <div role="status" aria-label="Loading resume" className="flex items-center justify-center h-40">
    <div aria-hidden="true" className="w-12 h-12 border-4 border-copper border-dotted rounded-full animate-spin"></div>
  </div>
);
