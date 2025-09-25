// src/components/history/historyItem.js

import { deleteHistoryItem } from '../../services/historyService.js';
import { renderHistory } from './historyList.js';

/**
 * Membuat elemen DOM untuk satu item riwayat.
 * @param {object} item - Data item riwayat.
 * @param {number} index - Indeks item dalam array riwayat.
 * @returns {HTMLElement} - Elemen div untuk item riwayat.
 */
export function createHistoryItemElement(item, index) {
  const itemEl = document.createElement('div');
  itemEl.className = 'history-item';

  // Thumbnail
  const thumb = document.createElement('div');
  thumb.className = 'history-thumb';
  if (item.fileUrl) {
    const img = document.createElement('img');
    img.src = item.fileUrl;
    img.alt = `Gambar ${item.class}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.loading = 'lazy'; // Improve performance
    thumb.appendChild(img);
  } else {
    thumb.textContent = 'No Img';
  }

  // Metadata
  const meta = document.createElement('div');
  meta.className = 'history-meta';
  const date = new Date(item.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  meta.innerHTML = `<p><strong>${item.class}</strong></p>
                    <p style="color:var(--muted);font-size:.9rem">${Math.round(item.confidence * 100)}% - ${date}</p>`;

  // Actions
  const actions = document.createElement('div');
  actions.className = 'history-actions';
  const btnDelete = document.createElement('button');
  btnDelete.className = 'btn ghost';
  btnDelete.innerHTML = '<span class="i i-trash" aria-hidden="true"></span> Hapus';
  btnDelete.setAttribute('aria-label', `Hapus item riwayat ${item.class}`);
  btnDelete.addEventListener('click', () => {
    if (confirm('Hapus item ini dari riwayat?')) {
      deleteHistoryItem(index);
      renderHistory(); // Re-render daftar setelah menghapus
    }
  });
  actions.appendChild(btnDelete);

  itemEl.append(thumb, meta, actions);
  return itemEl;
}
