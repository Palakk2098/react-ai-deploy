import { ChangeEvent, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { FileDetails, FormDetails } from '../common/types';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../common/constants';
import { getFiles, uploadFiles } from '../api';
import Card from './Card';

const Sidebar: React.FC<FormDetails> = ({
  uploadedFiles,
  setUploadedFiles,
  selectedFile,
  setSelectedFile,
  filesToUpload,
  setFilesToUpload,
  setLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // To fetch already uploaded files
  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFiles = async () => {
    const files = await getFiles();

    if (files && files.length) {
      setUploadedFiles(files);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const files = Array.from(event.target.files);
      const validFiles = [];
      for (const file of files) {
        // File Size Validation
        if (file.size > MAX_FILE_SIZE) {
          toast.error(
            `File "${file.name}" exceeds the maximum allowed size of 10MB.`
          );
          break;
        }

        // File Type Validation
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          toast.error(`File "${file.name} is not a PDF file`);
          break;
        }
        validFiles.push(file);
      }
      setSelectedFile(null);
      setFilesToUpload(validFiles);
    } else {
      toast.error('Please upload any file.');
    }
  };

  const handleFileUpload = async () => {
    const files = await uploadFiles(filesToUpload);

    if (files.status === 200) {
      fetchFiles();
      setFilesToUpload([]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const generateFileData = (file: FileDetails) => {
    setLoading(true);
    setSelectedFile(file);
    setLoading(false);
  };

  return (
    <aside className="sidebar">
      <div className="upload-section">
        <div className="file-selector">
          <div className="browse-section">
            <input
              type="text"
              readOnly
              onClick={handleButtonClick}
              placeholder="Select Files"
              className="file-display"
            />
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              ref={fileInputRef}
              accept="application/pdf"
              multiple
            />
            <button onClick={handleButtonClick} className="btn browse-btn">
              Browse
            </button>
          </div>
        </div>
        <div>
          {filesToUpload?.length ? (
            <ul className="file-select-list">
              <h4>Selected Files: </h4>
              {filesToUpload.map((file, index) => (
                <li key={index} className="file-item">
                  <Card title={file.name} selectedFile={file} />
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
          <button
            className="btn upload-btn"
            disabled={!filesToUpload.length}
            type="button"
            onClick={() => handleFileUpload()}
          >
            Upload
          </button>
        </div>
      </div>
      <hr></hr>
      {uploadedFiles?.length ? (
        <ul className="file-list">
          {uploadedFiles.map((file) => (
            <li key={file._id} className="file-item">
              <Card
                title={file.file_name}
                file={file}
                extractedFile={selectedFile}
                generateFileData={generateFileData}
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </aside>
  );
};

export default Sidebar;
