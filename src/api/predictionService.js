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
      throw new Error(`Server error (${response.status}): ${errorText || 'Unknown error'}`);
    }

    const result = await response.json();

    if (!result.data || typeof result.data.classification === 'undefined' || typeof result.data.confidence !== 'number') {
      throw new Error('Format respons API tidak valid.');
    }

    return result.data;
  } catch (error) {
    console.error('Prediction API call failed:', error);
    // Melempar ulang error agar bisa ditangani oleh pemanggil
    throw error;
  }
}
