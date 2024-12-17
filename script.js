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
    const leftReworkButton = document.getElementById('rework-left');
    const rightReworkButton = document.getElementById('rework-right');

    leftReworkButton.addEventListener('click', () => updateReworkCounter('left'));
    rightReworkButton.addEventListener('click', () => updateReworkCounter('right'));
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
