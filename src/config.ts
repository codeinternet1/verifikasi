// Base API URL dari environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost/backend/api";

// Semua endpoint API dengan base URL yang dinamis
export const API_ENDPOINTS = {
  signers: `${API_BASE_URL}/signers.php`,
  verify: `${API_BASE_URL}/verify.php`,
  documents: `${API_BASE_URL}/documents.php`,
  createDocument: `${API_BASE_URL}/create_document.php`,
  deleteDocument: `${API_BASE_URL}/delete_document.php`,
  updateDocument: `${API_BASE_URL}/update_document.php`,
  getDocuments: `${API_BASE_URL}/get_documents.php`,
  createSigner: `${API_BASE_URL}/create_signer.php`,
  updateSigner: `${API_BASE_URL}/update_signer.php`,
  deleteSigner: `${API_BASE_URL}/delete_signer.php`,
  getSigner: `${API_BASE_URL}/get_signer.php`,
  login: `${API_BASE_URL}/login.php`,
  download: `${API_BASE_URL}/download.php`,
  uploads: `${API_BASE_URL.replace('/api', '')}/uploads`
};

// Configuration dari environment
export const CONFIG = {
  API_BASE_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Document Verification System',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  MAX_FILE_SIZE: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '10485760'), // 10MB
  ALLOWED_EXTENSIONS: (import.meta.env.VITE_ALLOWED_EXTENSIONS || 'jpg,jpeg,png,pdf,doc,docx').split(','),
  UPLOADS_BASE: API_BASE_URL.replace('/api', ''),
};
