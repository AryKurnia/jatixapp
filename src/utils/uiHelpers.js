// src/utils/uiHelpers.js

import { DOMElements as D } from './dom.js';

let progressTimer = null;

/**
 * Mengatur teks status dan warnanya.
 * @param {string} text - Teks yang akan ditampilkan.
 * @param {boolean} isError - Jika true, teks akan berwarna merah.
 */
export function setStatus(text, isError = false) {
  if (D.statusEl) {
    D.statusEl.textContent = text;
    D.statusEl.style.color = isError ? '#ef4444' : '';
  }
}

/**
 * Menampilkan skeleton loader.
 */
export function startSkeleton() {
  if (D.skeleton) D.skeleton.style.display = 'block';
}

/**
 * Menyembunyikan skeleton loader.
 */
export function stopSkeleton() {
  if (D.skeleton) D.skeleton.style.display = 'none';
}

/**
 * Memulai animasi progress bar.
 */
export function startProgress() {
  if (!D.progressBar) return;
  let width = 10;
  D.progressBar.style.width = width + '%';
  clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    width = Math.min(width + Math.random() * 15, 92);
    D.progressBar.style.width = width.toFixed(0) + '%';
  }, 250);
}

/**
 * Mengakhiri animasi progress bar.
 */
export function finishProgress() {
  if (!D.progressBar) return;
  clearInterval(progressTimer);
  D.progressBar.style.width = '100%';
  setTimeout(() => (D.progressBar.style.width = '0%'), 600);
}

/**
 * Mengatur tampilan UI untuk mode kamera.
 * @param {boolean} isOpen - True jika kamera aktif.
 */
export function setCameraUiState(isOpen) {
  D.btnCapture.classList.toggle('hidden', !isOpen);
  D.btnCloseCamera.classList.toggle('hidden', !isOpen);
  D.btnOpenCamera.classList.toggle('hidden', isOpen);
  D.video.classList.toggle('hidden', !isOpen);
}

/**
 * Menampilkan hasil prediksi di kartu hasil.
 * @param {object} result - Objek hasil dari API.
 * @param {string} result.classification - Nama kelas/jenis.
 * @param {number} result.confidence - Skor kepercayaan (0-1).
 */
export function displayPredictionResult(result) {
    D.resultClass.textContent = result.classification;
    D.resultConfidence.textContent = `${Math.round(result.confidence * 100)}%`;
    D.resultCard.hidden = false;
}
