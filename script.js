// =============================
// Global Variables
// =============================
let qtyInspectCount = 0; // For Qty Inspect count
let leftClickCount = 0; // For Rework Kiri count
let rightClickCount = 0; // For Rework Kanan count

// =============================
// Defect Button Handling
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

// Function to handle defect button clicks
function handleDefectClick(defectName) {
    if (defectCounts.hasOwnProperty(defectName)) {
        defectCounts[defectName]++;
        console.log(`Defect ${defectName} updated to ${defectCounts[defectName]}`);
    } else {
        console.warn(`Defect '${defectName}' tidak dikenali.`);
    }

    updateDefectSummary();
}

// Update the defect summary
function updateDefectSummary() {
    const summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = ''; // Clear previous content

    for (const [defect, count] of Object.entries(defectCounts)) {
        if (count !== 0) {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.textContent = `${defect}: ${count}`;
            summaryList.appendChild(summaryItem);
        }
    }

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
// Inspect Button Handling
// =============================
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
// Rework Button Handling
// =============================
function updateReworkCounter(side) {
    if (side === 'left') {
        leftClickCount++;
        document.getElementById('left-counter').textContent = leftClickCount;
    } else if (side === 'right') {
        rightClickCount++;
        document.getElementById('right-counter').textContent = rightClickCount;
    }

    updateDefectSummary();
}

// Setup rework buttons
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

// =============================
// App Initialization
// =============================
function init() {
    setupDefectButtons();
    setupQtyInspectButton();
    setupReworkButtons();
}

// Wait for DOM to load before initializing
document.addEventListener('DOMContentLoaded', init);

// =============================
// Plus/Minus Button Handling
// =============================
let isAdding = false;
let isSubtracting = false;

function handlePlusClick() {
    isAdding = true;
    isSubtracting = false;
    document.getElementById('plus-button').classList.add('active');
    document.getElementById('minus-button').classList.remove('active');
}

function handleMinusClick() {
    isAdding = false;
    isSubtracting = true;
    document.getElementById('minus-button').classList.add('active');
    document.getElementById('plus-button').classList.remove('active');
}

document.getElementById('plus-button').addEventListener('click', handlePlusClick);
document.getElementById('minus-button').addEventListener('click', handleMinusClick);

// ==============================
// FTT Calculation
// ==============================
function calculateFTT() {
    if (qtyInspectCount === 0) return 0;
    const ftt = (qtyInspectCount - (leftClickCount + rightClickCount) / 2) / qtyInspectCount;
    return (ftt * 100).toFixed(2);
}

function updateFTTOutput() {
    const fttPercentage = calculateFTT();
    const fttOutput = document.getElementById('fttOutput');
    fttOutput.textContent = `${fttPercentage}%`;

    if (fttPercentage >= 80) {
        fttOutput.style.color = 'green';
    } else if (fttPercentage >= 50) {
        fttOutput.style.color = 'orange';
    } else {
        fttOutput.style.color = 'red';
    }
}
