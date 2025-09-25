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
      // PERBAIKAN: Memberikan pesan error server yang lebih baik
      const errorText = await response.text();
      throw new Error(`Terjadi masalah pada server (${response.status}). Coba lagi nanti.`);
    }

    const result = await response.json();

    if (!result.data || typeof result.data.classification === 'undefined' || typeof result.data.confidence !== 'number') {
      throw new Error('Format respons dari server tidak valid.');
    }

    return result.data;
  } catch (error) {
    console.error('Prediction API call failed:', error);
    
    // PERBAIKAN: Mendeteksi error jaringan dan memberikan pesan yang lebih manusiawi
    if (error instanceof TypeError) { // TypeError seringkali mengindikasikan masalah jaringan/CORS
        throw new Error('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    }

    // Melempar ulang error yang sudah memiliki pesan bagus atau error lainnya
    throw error;
  }
}