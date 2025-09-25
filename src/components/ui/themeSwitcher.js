// src/components/ui/themeSwitcher.js

import { DOMElements as D } from '../../utils/dom.js';

const PREF_THEME_KEY = 'pref-theme';

/**
 * Mengatur tema aplikasi (dark/light) dan menyimpannya di localStorage.
 * @param {'dark' | 'light'} theme - Nama tema.
 */
function setTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    D.toggleTheme.textContent = '☀️';
    D.toggleTheme.setAttribute('aria-pressed', 'true');
  } else {
    root.setAttribute('data-theme', 'light');
    D.toggleTheme.textContent = '🌙';
    D.toggleTheme.setAttribute('aria-pressed', 'false');
  }
  localStorage.setItem(PREF_THEME_KEY, theme);
}

/**
 * Menginisialisasi fungsionalitas pengubah tema.
 */
export function initializeThemeSwitcher() {
  D.toggleTheme.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  // Atur tema awal berdasarkan preferensi tersimpan atau default ke 'light'
  const preferredTheme = localStorage.getItem(PREF_THEME_KEY) || 'light';
  setTheme(preferredTheme);
}
