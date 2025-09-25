// src/components/ui/navigation.js

import { DOMElements as D } from '../../utils/dom.js';
import { renderHistory } from '../history/historyList.js';

const pages = {
  home: D.pageHome,
  history: D.pageHistory,
  info: D.pageInfo,
};

const navButtons = {
  home: D.btnHome,
  history: D.btnHistory,
  info: D.btnInfo,
};

/**
 * Mengaktifkan tombol navigasi yang sesuai.
 * @param {HTMLElement} activeBtn - Tombol yang akan diaktifkan.
 */
function activateNavButton(activeBtn) {
  Object.values(navButtons).forEach(btn => btn.classList.remove('is-active'));
  if (activeBtn) activeBtn.classList.add('is-active');
}

/**
 * Menampilkan halaman yang dipilih dan menyembunyikan yang lain.
 * @param {string} pageName - Nama halaman ('home', 'history', 'info').
 */
function showPage(pageName) {
  Object.values(pages).forEach(page => page.classList.add('hidden'));
  if (pages[pageName]) {
    pages[pageName].classList.remove('hidden');
    activateNavButton(navButtons[pageName]);
  }
}

/**
 * Menginisialisasi fungsionalitas navigasi antar halaman.
 */
export function initializeNavigation() {
  D.btnHome.addEventListener('click', () => showPage('home'));
  D.btnInfo.addEventListener('click', () => showPage('info'));
  
  D.btnHistory.addEventListener('click', () => {
    showPage('history');
    renderHistory(); // Render riwayat setiap kali halaman dibuka
  });
}
