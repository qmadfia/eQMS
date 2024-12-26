// Variabel Global
let totalInspected = 0; // Total barang yang diinspeksi
let totalReworkLeft = 0; // Total rework kiri
let totalReworkRight = 0; // Total rework kanan

// Elemen DOM
const fttOutput = document.getElementById('fttOutput');
const qtyInspectOutput = document.getElementById('qtyInspectOutput');
const leftCounter = document.getElementById('left-counter');
const rightCounter = document.getElementById('right-counter');

// Event Listener untuk "Qty Inspect"
const qtyInspectButton = document.querySelector('.input-button');
qtyInspectButton.addEventListener('click', () => {
    totalInspected++;
    qtyInspectOutput.textContent = totalInspected;
    updateFTT();
});

// Event Listener untuk "Rework Kiri"
const reworkLeftButton = document.getElementById('rework-left');
reworkLeftButton.addEventListener('click', () => {
    totalReworkLeft++;
    leftCounter.textContent = totalReworkLeft;
    updateFTT();
});

// Event Listener untuk "Rework Kanan"
const reworkRightButton = document.getElementById('rework-right');
reworkRightButton.addEventListener('click', () => {
    totalReworkRight++;
    rightCounter.textContent = totalReworkRight;
    updateFTT();
});

// Fungsi untuk Menghitung FTT
function updateFTT() {
    if (totalInspected === 0) {
        fttOutput.textContent = '0%';
        return;
    }
    const averageRework = (totalReworkLeft + totalReworkRight) / 2;
    const fttValue = ((totalInspected - averageRework) / totalInspected) * 100;
    fttOutput.textContent = `${Math.max(0, fttValue.toFixed(2))}%`; // Nilai FTT tidak boleh negatif
}

// Fungsi untuk menangani klik tombol defect
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
        defectCounts[defectName]++;
        console.log(`Defect ${defectName} updated to ${defectCounts[defectName]}`);
    } else {
        console.warn(`Defect '${defectName}' tidak dikenali.`);
    }

    // Update the defect summary
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

// Initialize the app
function init() {
    setupDefectButtons(); // Setup defect buttons
}

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', init);
