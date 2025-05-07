import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PDFViewer from '../components/PDFViewer';
import ChatbotPanel from '../components/ChatbotPanel';
import TitleSection from '../components/TitleSection';
// import CollapsiblePanel from '../components/CollapsiblePanel';
import { FileDetails, OptionType } from '../common/types';
import { MODEL_OPTIONS } from '../common/constants';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileDetails[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileDetails | null>(null);
  const [model, setModel] = useState<OptionType | null>(MODEL_OPTIONS[0]);

  return (
    <div className="layout">
      <Sidebar
        selectedFile={selectedFile}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
        setSelectedFile={setSelectedFile}
        setLoading={setLoading}
      />

      <div className="main">
        {loading ? (
          <h2>Loading...</h2>
        ) : selectedFile ? (
          <>
            <TitleSection
              title={selectedFile.file_name}
              model={model}
              setModel={setModel}
            />

            <div className="horizontal-panels">
              {/* <div className="collapsible-panel-wrapper">
                <CollapsiblePanel id={selectedFile?._id} model={model} />
              </div> */}

              <div className="pdf-viewer-wrapper">
                <PDFViewer id={selectedFile?._id} />
              </div>

              <div className="chatbot-panel-wrapper">
                <ChatbotPanel id={selectedFile?._id} model={model} />
              </div>
            </div>
          </>
        ) : (
          <div className="px-2">
            <h2>Please select a file to proceed.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
