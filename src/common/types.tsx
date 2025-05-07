export type DocDetails = {
  contract_title: string;
  contract_type: string;
  contract_start_date: string;
  contract_end_date: string;
  contract_amount: string;
  contract_naisc_code: string;
  contract_eligibility_criteria: string;
  contract_scope: string;
  contract_processing_for_biding: string;
};
export type FileDetails = {
  _id: string;
  file_name: string;
  file_size: string;
  file_path: string;
  name?: string;
  size?: string;
};
export type FormDetails = {
  uploadedFiles: FileDetails[];
  selectedFile: FileDetails | null;
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileDetails[]>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileDetails | null>>;
  filesToUpload: File[];
  setFilesToUpload: React.Dispatch<React.SetStateAction<File[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type OptionType = {
  label: string;
  value: string;
};

export type TitleDetails = {
  title?: string;
  model: OptionType | null;
  setModel: React.Dispatch<React.SetStateAction<OptionType | null>>;
};

export type FilesResponse = {
  status: number;
  data: {
    result: FileDetails[];
  };
};

export type ExtractInfoRequest = {
  id: string;
  is_qna: boolean;
  model_name: string;
  question?: string;
};
