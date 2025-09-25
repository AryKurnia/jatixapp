// src/components/history/historyList.js

import { getHistory } from '../../services/historyService.js';
import { createHistoryItemElement } from './historyItem.js';
import { DOMElements as D } from '../../utils/dom.js';

/**
 * Merender seluruh daftar riwayat ke dalam container.
 */
export function renderHistory() {
  const list = getHistory();
  
  // Clear previous content
  D.historyList.innerHTML = ''; 

  if (list.length === 0) {
    D.historyList.innerHTML = '<p>Tidak ada riwayat.</p>';
    return;
  }

  list.forEach((item, index) => {
    const itemElement = createHistoryItemElement(item, index);
    D.historyList.appendChild(itemElement);
  });
}
