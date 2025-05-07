// src/api.js
import axios from 'axios';
import { API_BASE_URL } from '../common/constants';
import { toast } from 'react-toastify';
import { ExtractInfoRequest, FilesResponse } from '../common/types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// File upload
export const uploadFiles = async (files: File[]) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]); // or 'files[]' if backend expects it
    }

    const response = await api.post('/documents/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.status !== 200) {
      toast.error('Error while uploading file/s.');
    } else {
      toast.success('File uploaded successfully!');
      return response.data;
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!');
  }
};

// Get list of files
export const getFiles = async () => {
  try {
    const response: FilesResponse = await api.get('/documents/');
    if (response.status !== 200) {
      toast.error('Error while fetching files.');
    } else {
      return response.data.result;
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!');
  }
};

// Get File by ID
export const getFileByID = async (id: string) => {
  try {
    const response = await api.get(`/documents/${id}`, {
      headers: { 'Content-Type': 'application/pdf' },
    });
    if (response.status !== 200) {
      toast.error('Error while fetching file.');
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!');
  }
};

export const getInfo = async (reqData: ExtractInfoRequest) => {
  try {
    const response = await api.post('/qna/', {
      fileid: reqData.id,
      is_qna: reqData.is_qna,
      question: reqData.question,
      model_name: reqData.model_name,
    });

    if (response.status !== 200) {
      toast.error('Error while fetching details.');
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!');
  }
};

export default api;
