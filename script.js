// =============================
// 1. Variabel Global
// =============================
let totalInspected = 0; // Total barang yang diinspeksi
let totalReworkLeft = 0; // Total rework kiri
let totalReworkRight = 0; // Total rework kanan
let isAdding = false; // Flag untuk menandakan mode penambahan
let isSubtracting = false; // Flag untuk menandakan mode pengurangan

// Elemen DOM
const fttOutput = document.getElementById('fttOutput');
const qtyInspectOutput = document.getElementById('qtyInspectOutput');
const leftCounter = document.getElementById('left-counter');
const rightCounter = document.getElementById('right-counter');

// =============================
// 2. Event Listener untuk Qty Inspect
// =============================
const qtyInspectButton = document.querySelector('.input-button');
qtyInspectButton.addEventListener('click', () => {
    totalInspected++;
    qtyInspectOutput.textContent = totalInspected;
    updateFTT();
});

// =============================
// 3. Event Listener untuk Rework
// =============================
const reworkLeftButton = document.getElementById('rework-left');
reworkLeftButton.addEventListener('click', () => {
    totalReworkLeft++;
    leftCounter.textContent = totalReworkLeft;
    updateFTT();
});

const reworkRightButton = document.getElementById('rework-right');
reworkRightButton.addEventListener('click', () => {
    totalReworkRight++;
    rightCounter.textContent = totalReworkRight;
    updateFTT();
});

// =============================
// 4. Fungsi untuk Menghitung FTT
// =============================
function updateFTT() {
    if (totalInspected === 0) {
        fttOutput.textContent = '0%';
        return;
    }
    const averageRework = (totalReworkLeft + totalReworkRight) / 2;
    const fttValue = ((totalInspected - averageRework) / totalInspected) * 100;
    fttOutput.textContent = `${Math.max(0, fttValue.toFixed(2))}%`; // Nilai FTT tidak boleh negatif
}

// =============================
// 5. Fungsi Plus dan Minus
// =============================
function handlePlusClick() {
    isAdding = true; // Aktifkan mode penambahan
    isSubtracting = false; // Nonaktifkan mode pengurangan
    document.getElementById('plus-button').classList.add('active');
    document.getElementById('minus-button').classList.remove('active');
}

function handleMinusClick() {
    isAdding = false; // Nonaktifkan mode penambahan
    isSubtracting = true; // Aktifkan mode pengurangan
    document.getElementById('minus-button').classList.add('active');
    document.getElementById('plus-button').classList.remove('active');
}

// Fungsi untuk menangani klik Qty Inspect berdasarkan status Plus/Minus
function handleQtyInspectClick() {
    let qtyInspectCount = parseInt(qtyInspectOutput.textContent) || 0;

    if (isAdding) {
        qtyInspectCount++; // Tambah jika mode penambahan aktif
    } else if (isSubtracting) {
        qtyInspectCount--; // Kurangi jika mode pengurangan aktif
    }

    qtyInspectOutput.textContent = qtyInspectCount; // Perbarui output
    totalInspected = qtyInspectCount; // Perbarui totalInspected untuk FTT
    updateFTT(); // Perbarui FTT
}

// =============================
// 6. Fungsi untuk Mengupdate Counter Rework
// =============================
function updateReworkCounter(side) {
    let counterElement;
    let currentCount;

    if (side === 'left') {
        counterElement = leftCounter;
    } else if (side === 'right') {
        counterElement = rightCounter;
    } else {
        return; // Keluar jika sisi tidak valid
    }

    currentCount = parseInt(counterElement.textContent) || 0;

    if (isAdding) {
        currentCount++; // Tambah
    } else if (isSubtracting) {
        currentCount--; // Kurangi
    }

    counterElement.textContent = currentCount; // Perbarui elemen counter
}

// =============================
// 7. Event Listeners untuk Plus dan Minus Buttons
// =============================
document.getElementById('plus-button').addEventListener('click', handlePlusClick);
document.getElementById('minus-button').addEventListener('click', handleMinusClick);

// Event listener untuk Qty Inspect button (ini adalah tombol yang melakukan penambahan atau pengurangan)
qtyInspectButton.addEventListener('click', handleQtyInspectClick);

// Event listeners untuk Rework Kiri dan Rework Kanan
reworkLeftButton.addEventListener('click', () => {
    updateReworkCounter('left');
    updateFTT(); // Perbarui FTT setelah rework
});

reworkRightButton.addEventListener('click', () => {
    updateReworkCounter('right');
    updateFTT(); // Perbarui FTT setelah rework
});

// =============================
// 8. Fungsi untuk menangani klik tombol defect
// =============================
const defectCounts = {
    "OVER CEMENT": 0,
    "STAIN UPPER": 0,
    "STAIN OUTSOLE": 0,
    "THREAD END": 0,
    "RAT HOLE": 0,
    "BOND GAP UPPER": 0,
    "WRINKLE": 0,
    "ALIGN UP": 0,
    "OVER BUFFING": 0,
    "OFF CENTER": 0,
    "ARIANCE": 0,
    "X-RAY": 0,
    "BROKEN STITCHING": 0,
    "TOE / HEEL / COLLAR SHAPE": 0,
    "STITCH MARGIN / SPI": 0,
    "YELLOWING": 0,
    "ROCKING": 0,
    "BOND GAP MIDSOLE": 0,
    "MATERIAL FAILURE": 0,
    "COLOR MIGRATION": 0,
    "PEEL OFF": 0,
    "DELAMINATION": 0,
    "METAL CONTAMINATION": 0,
    "TWISTED SHOE": 0,
    "LOGO / AIR BAG": 0
};

// Setup defect buttons
function setupDefectButtons() {
    const defectButtons = document.querySelectorAll('.defect-button');
    defectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const defectName = button.textContent.trim();
            handleDefectClick(defectName);
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 200);
        });
    });
}

// Function to handle defect button clicks
function handleDefectClick(defectName) {
    if (defectCounts.hasOwnProperty(defectName)) {
        if (isAdding) {
            defectCounts[defectName]++;  // Menambah defect jika tombol Plus aktif
        } else if (isSubtracting) {
            defectCounts[defectName]--;  // Mengurangi defect jika tombol Minus aktif
        }

        // Update nilai defect pada tampilan
        console.log(`Defect ${defectName} updated to ${defectCounts[defectName]}`);
    } else {
        console.warn(`Defect '${defectName}' tidak dikenali.`);
    }

    // Update summary defect
    updateDefectSummary();
}

// Update the defect summary
function updateDefectSummary() {
    const summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = ''; // Clear previous content

    // Loop through defect counts and display them
    for (const [defect, count] of Object.entries(defectCounts)) {
        if (count !== 0) {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.textContent = `${defect}: ${count}`;
            summaryList.appendChild(summaryItem);
        }
    }
}

// =============================
// 9. Inisialisasi Aplikasi
// =============================
function init() {
    setupDefectButtons(); // Setup defect buttons
}

// Tunggu hingga DOM dimuat sebelum menginisialisasi
document.addEventListener('DOMContentLoaded', init);
