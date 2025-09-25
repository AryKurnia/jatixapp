// src/utils/dom.js

/**
 * Kumpulan elemen DOM yang sering digunakan, diekspor untuk kemudahan akses.
 */
export const DOMElements = {
  // Global & Footer
  yearEl: document.getElementById('year'),
  
  // Navigasi
  btnHome: document.getElementById('btn-home'),
  btnHistory: document.getElementById('btn-history'),
  btnInfo: document.getElementById('btn-info'),

  // Pages
  pageHome: document.getElementById('page-home'),
  pageHistory: document.getElementById('page-history'),
  pageInfo: document.getElementById('page-info'),

  // Upload & Preview
  inputFile: document.getElementById('input-file'),
  previewImage: document.getElementById('preview-image'),
  previewPlaceholder: document.getElementById('preview-placeholder'),
  skeleton: document.getElementById('skeleton'),
  
  // Kamera
  btnOpenCamera: document.getElementById('btn-open-camera'),
  btnCapture: document.getElementById('btn-capture'),
  btnCloseCamera: document.getElementById('btn-close-camera'),
  video: document.getElementById('camera-stream'),

  // Actions
  btnSend: document.getElementById('btn-send'),
  btnClear: document.getElementById('btn-clear'),
  
  // Status & Progress
  statusEl: document.getElementById('status'),
  progressBar: document.getElementById('progress-bar'),

  // Result Card
  resultCard: document.getElementById('result-card'),
  resultClass: document.getElementById('result-class'),
  resultConfidence: document.getElementById('result-confidence'),
  btnSaveHistory: document.getElementById('btn-save-history'),
  btnNew: document.getElementById('btn-new'),
  
  // History Page
  historyList: document.getElementById('history-list'),
  btnClearHistory: document.getElementById('btn-clear-history'),

  // Theme
  toggleTheme: document.getElementById('toggle-theme'),
};
