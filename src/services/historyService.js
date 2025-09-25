// src/services/historyService.js

const HISTORY_KEY = 'hj_history';

/**
 * Mengambil semua item riwayat dari localStorage.
 * @returns {Array<object>} - Array berisi item riwayat.
 */
export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch (e) {
    console.error("Gagal mem-parsing data riwayat:", e);
    return [];
  }
}

/**
 * Menyimpan satu item baru ke riwayat (di bagian atas).
 * @param {object} item - Item hasil klasifikasi yang akan disimpan.
 */
export function saveToHistory(item) {
  const list = getHistory();
  list.unshift(item);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
}

/**
 * Menghapus satu item dari riwayat berdasarkan indeksnya.
 * @param {number} index - Indeks item yang akan dihapus.
 */
export function deleteHistoryItem(index) {
  const list = getHistory();
  if (index >= 0 && index < list.length) {
    list.splice(index, 1);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  }
}

/**
 * Menghapus semua item dari riwayat.
 */
export function clearAllHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
