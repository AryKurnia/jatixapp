// src/core/app.js

import { DOMElements as D } from '../utils/dom.js';
import { setStatus, startProgress, finishProgress, startSkeleton, stopSkeleton, setCameraUiState, displayPredictionResult } from '../utils/uiHelpers.js';
import { sendImageForPrediction } from '../api/predictionService.js';
import { saveToHistory, clearAllHistory } from '../services/historyService.js';
import { renderHistory } from '../components/history/historyList.js';
import { initializeThemeSwitcher } from '../components/ui/themeSwitcher.js';
import { initializeNavigation } from '../components/ui/navigation.js';


// --- State Aplikasi ---
let currentImageFile = null;
let cameraStream = null;

// --- Fungsi Logika Inti ---

/**
 * Membersihkan pilihan gambar, preview, dan hasil.
 */
function clearSelection() {
  currentImageFile = null;

  D.previewImage.src = '';
  D.previewImage.style.display = 'none';
  D.previewPlaceholder.style.display = 'block';
  if (D.inputFile) D.inputFile.value = '';
  
  D.btnSend.disabled = true;
  D.resultCard.hidden = true;
  
  setStatus('');
}

/**
 * Menangani file yang dipilih oleh pengguna.
 * @param {File} file - File gambar dari input atau kamera.
 */
function handleFileSelect(file) {
    if (!file) return clearSelection();

    if (!file.type.startsWith('image/')) {
        setStatus('Silakan pilih file gambar.', true);
        return;
    }

    currentImageFile = file;
    startSkeleton();
    
    const reader = new FileReader();
    reader.onload = (e) => {
        D.previewImage.src = e.target.result;
        D.previewImage.style.display = 'block';
        D.previewPlaceholder.style.display = 'none';
        D.btnSend.disabled = false;
        D.resultCard.hidden = true;
        setStatus('');
    };
    reader.readAsDataURL(file);
}


// --- Pengaturan Event Listeners ---

function setupEventListeners() {
    // Input file
    D.inputFile.addEventListener('change', (e) => handleFileSelect(e.target.files[0]));
    D.previewImage.addEventListener('load', stopSkeleton);

    // Tombol Aksi Utama
    D.btnClear.addEventListener('click', clearSelection);
    D.btnNew.addEventListener('click', clearSelection);
    D.btnSend.addEventListener('click', handleSend);

    // Kamera
    D.btnOpenCamera.addEventListener('click', openCamera);
    D.btnCapture.addEventListener('click', captureImage);
    D.btnCloseCamera.addEventListener('click', closeCamera);

    // Riwayat
    D.btnClearHistory.addEventListener('click', () => {
        if (confirm('Anda yakin ingin menghapus semua riwayat? Tindakan ini tidak dapat dibatalkan.')) {
            clearAllHistory();
            renderHistory();
        }
    });
}

// --- Handler untuk Event ---

async function handleSend() {
    if (!currentImageFile) {
        return setStatus('Belum ada gambar untuk dikirim.', true);
    }
    
    setStatus('Mengirim gambar ke server...');
    D.btnSend.disabled = true;
    startProgress();

    try {
        const result = await sendImageForPrediction(currentImageFile);
        displayPredictionResult(result);
        
        // PERBAIKAN: Langsung simpan ke riwayat secara otomatis
        const resultToSave = {
            class: result.classification,
            confidence: result.confidence,
            fileUrl: URL.createObjectURL(currentImageFile), // Buat URL lokal untuk preview
            timestamp: new Date().toISOString(),
        };
        saveToHistory(resultToSave);
        setStatus('Hasil diterima dan otomatis disimpan ke riwayat.');

    } catch (err) {
        setStatus(err.message, true);
    } finally {
        finishProgress();
    }
}

// --- Logika Kamera ---

async function openCamera() {
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        D.video.srcObject = cameraStream;
        setCameraUiState(true);
        setStatus('Kamera aktif. Arahkan kamera ke daun dan tekan "Potret".');
    } catch (err) {
        console.error("Camera access error:", err);
        setStatus('Tidak dapat mengakses kamera. Periksa izin browser.', true);
    }
}

function captureImage() {
    if (!cameraStream) return;

    const canvas = document.createElement('canvas');
    canvas.width = D.video.videoWidth;
    canvas.height = D.video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(D.video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
        if (!blob) {
            setStatus('Gagal mengambil gambar dari kamera.', true);
            return;
        }
        const capturedFile = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        handleFileSelect(capturedFile);
        closeCamera();
    }, 'image/jpeg', 0.9);
}

function closeCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    setCameraUiState(false);
    setStatus('');
}

// --- Inisialisasi Aplikasi ---

function initializeApp() {
    D.yearEl.textContent = new Date().getFullYear();
    
    initializeThemeSwitcher();
    initializeNavigation();
    setupEventListeners();
    
    console.log("Aplikasi berhasil diinisialisasi.");
}

// Jalankan aplikasi setelah DOM siap
document.addEventListener('DOMContentLoaded', initializeApp);