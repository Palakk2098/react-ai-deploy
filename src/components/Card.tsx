import { FileDetails } from '../common/types';
import { formatBytes } from '../common/utils';

type CardDetails = {
  title?: string;
  file?: FileDetails;
  selectedFile?: File;
  extractedFile?: FileDetails | null;
  generateFileData?: (file: FileDetails) => void;
};
export default function Card({
  title,
  file,
  generateFileData,
  selectedFile,
  extractedFile,
}: CardDetails) {
  return (
    <div
      className={extractedFile?._id === file?._id ? 'card selected' : 'card'}
      onClick={() => file && generateFileData && generateFileData(file)}
    >
      <p className="file-select-name">{title}</p>
      <p className="file-size">
        {file?.file_size || (selectedFile && formatBytes(selectedFile.size))}
      </p>
    </div>
  );
}
