// src/components/PDFViewer.tsx
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import InfiniteScroll from 'react-infinite-scroll-component';
import { API_BASE_URL } from '../common/constants';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
interface PDFViewerProps {
  id?: string; // The URL or path of the PDF file
}

const PDFViewer: React.FC<PDFViewerProps> = ({ id }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const loadMorePages = () => {
    if (numPages && currentPage < numPages) {
      setPages((prevPages) => [...prevPages, currentPage + 1]);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (numPages && currentPage <= numPages) {
      setPages([1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages, id]);

  return (
    <div className="pdf-viewer">
      <div className="panel-title">Document Viewer</div>
      <Document
        file={`${API_BASE_URL}/documents/${id}`}
        onLoadSuccess={onLoadSuccess}
        loading={<div className="pdf-loader"></div>}
      >
        <InfiniteScroll
          dataLength={pages.length}
          next={loadMorePages}
          hasMore={currentPage < numPages!}
          loader={<></>}
          scrollThreshold={0.9} // Trigger loadMorePages when 90% scrolled
          scrollableTarget="scrollable-container" // Apply scrollable target for infinite scroll
        >
          <div id="scrollable-container" className="pdf-pages-container">
            {pages.map((pageNumber) => (
              <div key={pageNumber}>
                <Page pageNumber={pageNumber} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </Document>
    </div>
  );
};

export default PDFViewer;
