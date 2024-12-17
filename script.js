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
       {
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
let isAdding = false; // Flag to track if adding is active
let isSubtracting = false; // Flag to track if subtracting is active

// Function to handle Plus button click
function handlePlusClick() {
    isAdding = true; // Enable adding mode
    isSubtracting = false; // Disable subtracting mode
    document.getElementById('plus-button').classList.add('active'); // Highlight Plus button
    document.getElementById('plus-button').classList.remove('inactive'); // Make Plus button active
    document.getElementById('minus-button').classList.remove('active'); // Remove highlight from Minus button
    document.getElementById('minus-button').classList.add('inactive'); // Make Minus button inactive
}

// Function to handle Minus button click
function handleMinusClick() {
    isAdding = false; // Disable adding mode
    isSubtracting = true; // Enable subtracting mode
    document.getElementById('minus-button').classList.add('active'); // Highlight Minus button
    document.getElementById('minus-button').classList.remove('inactive'); // Make Minus button active
    document.getElementById('plus-button').classList.remove('active'); // Remove highlight from Plus button
    document.getElementById('plus-button').classList.add('inactive'); // Make Plus button inactive
}

// Function to handle Qty Inspect click based on Plus/Minus state
function handleQtyInspectClick() {
    let qtyInspectCount = parseInt(document.getElementById('qtyInspectOutput').textContent) || 0;
    
    if (isAdding) {
        qtyInspectCount++; // Increment if adding
    } else if (isSubtracting) {
        qtyInspectCount--; // Decrement if subtracting
    }

    document.getElementById('qtyInspectOutput').textContent = qtyInspectCount; // Update the output
}

// Function to update rework counters (left or right)
function updateReworkCounter(side) {
    let counterElement;
    let currentCount;

    // Determine which counter to update
    if (side === 'left') {
        counterElement = document.getElementById('left-counter');
    } else if (side === 'right') {
        counterElement = document.getElementById('right-counter');
    } else {
        return; // Exit if side is invalid
    }

    // Get the current count from the counter element
    currentCount = parseInt(counterElement.textContent) || 0;

    // Check Plus/Minus state
    if (isAdding) {
        currentCount++; // Increment
    } else if (isSubtracting) {
        currentCount--; // Decrement
    }

    // Update the counter element
    counterElement.textContent = currentCount;
}
// Fungsi untuk menangani klik tombol defect
function handleDefectClick(defectName) {
    // Pastikan status plus atau minus mempengaruhi perubahan nilai defect
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

// Event listeners for Plus and Minus buttons
document.getElementById('plus-button').addEventListener('click', handlePlusClick);
document.getElementById('minus-button').addEventListener('click', handleMinusClick);

// Event listener for Qty Inspect button (this is the button that does the increment or decrement)
document.querySelector('.input-button').addEventListener('click', handleQtyInspectClick);

// Event listeners for Rework Kiri and Rework Kanan
document.getElementById('.rework-left').addEventListener('click', function() {
    updateReworkCounter('left');
});

document.getElementById('.rework-right').addEventListener('click', function() {
    updateReworkCounter('right');
});

document.getElementById('.defect-button').addEventListener('click', function() {
    updateDefectSummary();
});


