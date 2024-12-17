// =============================
// 1. Defect Button Handling
// =============================

// Global object to store defect counts
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
        if (count > 0) {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.textContent = `${defect}: ${count}`;
            summaryList.appendChild(summaryItem);
        }
    }

    // Update rework counters in summary
    const reworkSummary = document.getElementById('rework-summary');
    reworkSummary.textContent = `Rework Kiri: ${leftClickCount} | Rework Kanan: ${rightClickCount}`;
}

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

// =============================
// 2. Inspect Button Handling
// =============================

let qtyInspectCount = 0; // Untuk Qty Inspect

// Function to handle Qty Inspect button click
function handleQtyInspectClick() {
    qtyInspectCount++;
    document.getElementById('qtyInspectOutput').textContent = qtyInspectCount;
}

// Setup Qty Inspect button
function setupQtyInspectButton() {
    const inputButton = document.querySelector('.input-button');
    if (inputButton) {
        inputButton.addEventListener('click', handleQtyInspectClick);
    }
}

// =============================
// 3. Rework Button Handling
// =============================

let leftClickCount = 0; // Untuk Rework Kiri
let rightClickCount = 0; // Untuk Rework Kanan

// Function to update rework counters (left or right)
function updateReworkCounter(side) {
    if (side === 'left') {
        leftClickCount++;
        document.getElementById('left-counter').textContent = leftClickCount;
    } else if (side === 'right') {
        rightClickCount++;
        document.getElementById('right-counter').textContent = rightClickCount;
    }

    // Update rework summary after each click
    updateDefectSummary();
}

// Setup rework buttons
function setupReworkButtons() {
    // Menggunakan querySelector untuk memilih tombol berdasarkan ID
    const leftReworkButton = document.querySelector('#rework-left');
    const rightReworkButton = document.querySelector('#rework-right');

    // Menambahkan event listener pada tombol kiri dan kanan
    if (leftReworkButton) {
        leftReworkButton.addEventListener('click', () => updateReworkCounter('left'));
    }

    if (rightReworkButton) {
        rightReworkButton.addEventListener('click', () => updateReworkCounter('right'));
    }
}

// =============================
// 4. App Initialization
// =============================

// Initialize the app
function init() {
    setupDefectButtons(); // Setup defect buttons
    setupQtyInspectButton(); // Setup Qty Inspect button
    setupReworkButtons(); // Setup Rework buttons
}

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', init);

// =============================
// 5. Plus Minus
// =============================
let isAdding = false; // Flag untuk menandakan jika mode menambah aktif
let isSubtracting = false; // Flag untuk menandakan jika mode mengurangi aktif
let leftClickCount = 0; // Untuk Rework Kiri
let rightClickCount = 0; // Untuk Rework Kanan

// Fungsi untuk menangani klik tombol Plus
function handlePlusClick() {
    isAdding = true; // Aktifkan mode menambah
    isSubtracting = false; // Nonaktifkan mode mengurangi
    document.getElementById('plus-button').classList.add('active'); // Sorot tombol Plus
    document.getElementById('plus-button').classList.remove('inactive'); // Buat tombol Plus aktif
    document.getElementById('minus-button').classList.remove('active'); // Hilangkan sorotan dari tombol Minus
    document.getElementById('minus-button').classList.add('inactive'); // Buat tombol Minus tidak aktif
}

// Fungsi untuk menangani klik tombol Minus
function handleMinusClick() {
    isAdding = false; // Nonaktifkan mode menambah
    isSubtracting = true; // Aktifkan mode mengurangi
    document.getElementById('minus-button').classList.add('active'); // Sorot tombol Minus
    document.getElementById('minus-button').classList.remove('inactive'); // Buat tombol Minus aktif
    document.getElementById('plus-button').classList.remove('active'); // Hilangkan sorotan dari tombol Plus
    document.getElementById('plus-button').classList.add('inactive'); // Buat tombol Plus tidak aktif
}

// Fungsi untuk menangani klik Qty Inspect berdasarkan kondisi Plus/Minus
function handleQtyInspectClick() {
    let qtyInspectCount = parseInt(document.getElementById('qtyInspectOutput').textContent) || 0;

    if (isAdding) {
        qtyInspectCount++; // Increment jika menambah
        updateReworkCounter('right'); // Update Rework Kanan
    } else if (isSubtracting) {
        qtyInspectCount--; // Decrement jika mengurangi
        updateReworkCounter('left'); // Update Rework Kiri
    }

    document.getElementById('qtyInspectOutput').textContent = qtyInspectCount; // Update output qty
}

// Fungsi untuk update counter rework kiri dan kanan
function updateReworkCounter(side) {
    if (side === 'left') {
        leftClickCount++;
        document.getElementById('left-counter').textContent = leftClickCount; // Update rework kiri
    } else if (side === 'right') {
        rightClickCount++;
        document.getElementById('right-counter').textContent = rightClickCount; // Update rework kanan
    }

    // Update summary rework setelah setiap klik
    updateDefectSummary();
}

// Fungsi untuk setup tombol rework kiri dan kanan
function setupReworkButtons() {
    const leftReworkButton = document.querySelector('#rework-left');
    const rightReworkButton = document.querySelector('#rework-right');

    if (leftReworkButton) {
        leftReworkButton.addEventListener('click', () => updateReworkCounter('left'));
    }

    if (rightReworkButton) {
        rightReworkButton.addEventListener('click', () => updateReworkCounter('right'));
    }
}

// Event listeners untuk tombol Plus dan Minus
document.getElementById('plus-button').addEventListener('click', handlePlusClick);
document.getElementById('minus-button').addEventListener('click', handleMinusClick);

// Event listener untuk tombol Qty Inspect (menangani increment atau decrement)
document.querySelector('.input-button').addEventListener('click', handleQtyInspectClick);

// Inisialisasi setup rework buttons
setupReworkButtons();


