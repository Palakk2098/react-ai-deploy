// const API_BASE_URL = 'http://192.168.102.182:8000/api';
const API_BASE_URL = 'http://192.168.103.191:8000/api';
// const API_BASE_URL = 'http://127.0.0.1:8000/api';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['application/pdf'];
const MODEL_OPTIONS = [
  { label: 'HF - roberta-base-squad2 (Open Source)', value: 'rbs' },
  {
    label: 'HF - distilbert-base-uncased-distilled-squad (Open Source)',
    value: 'dbcds',
  },
  {
    label: 'HF - minilm-uncased-squad2 (Open Source)',
    value: 'mus',
  },
  {
    label: 'Openhermes (Open Source)',
    value: 'openhermes',
  },
  {
    label: 'Llama (Open Source)',
    value: 'llama',
  },
];

export { ALLOWED_FILE_TYPES, API_BASE_URL, MAX_FILE_SIZE, MODEL_OPTIONS };
