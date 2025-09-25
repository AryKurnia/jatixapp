// src/api/predictionService.js

const API_URL = 'http://localhost:5001/predictions/umum'; // Konfigurasi terpusat

/**
 * Mengirim file gambar ke API untuk klasifikasi.
 * @param {File} imageFile - File gambar yang akan dikirim.
 * @returns {Promise<object>} - Objek hasil dari API.
 * @throws {Error} - Jika terjadi kegagalan pada request atau respons tidak valid.
 */
export async function sendImageForPrediction(imageFile) {
  const form = new FormData();
  form.append('image', imageFile);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Terjadi masalah pada server (${response.status}). Coba lagi nanti.`);
    }

    const result = await response.json();

    // Pastikan semua data yang dibutuhkan ada
    if (!result.data || !result.data.classification || typeof result.data.confidence !== 'number' || !result.data.fileUrl) {
      throw new Error('Format respons dari server tidak valid atau tidak lengkap.');
    }

    return result.data; // Kembalikan seluruh objek data
  } catch (error) {
    console.error('Prediction API call failed:', error);
    if (error instanceof TypeError) {
      throw new Error('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    }
    throw error;
  }
}