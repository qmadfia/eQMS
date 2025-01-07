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
    updateQuantity('qtyInspectOutput', 1); // Tambah Qty Inspect
    updateFTT(); // Perbarui FTT
});

// =============================
// 3. Event Listener untuk Rework
// =============================
const reworkLeftButton = document.getElementById('rework-left');
reworkLeftButton.addEventListener('click', () => {
    updateQuantity('left-counter', 1); // Tambah Rework Kiri
    updateFTT(); // Perbarui FTT
});

const reworkRightButton = document.getElementById('rework-right');
reworkRightButton.addEventListener('click', () => {
    updateQuantity('right-counter', 1); // Tambah Rework Kanan
    updateFTT(); // Perbarui FTT
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
// 5. Fungsi untuk Mengupdate Kuantitas
// =============================
function updateQuantity(counterId, change) {
    const counterElement = document.getElementById(counterId);
    let currentValue = parseInt(counterElement.textContent) || 0; // Ambil nilai saat ini

    // Tambah atau kurangi nilai berdasarkan mode
    if (isAdding) {
        currentValue++; // Tambah jika mode penambahan aktif
    } else if (isSubtracting) {
        currentValue--; // Kurangi jika mode pengurangan aktif
    }

    // Pastikan nilai tidak kurang dari 0
    if (currentValue < 0) {
        currentValue = 0;
    }

    // Perbarui elemen counter
    counterElement.textContent = currentValue;

    // Perbarui totalInspected dan totalRework
    if (counterId === 'qtyInspectOutput') {
        totalInspected = currentValue; // Perbarui totalInspected
    } else if (counterId === 'left-counter') {
        totalReworkLeft = currentValue; // Perbarui totalReworkLeft
    } else if (counterId === 'right-counter') {
        totalReworkRight = currentValue; // Perbarui totalReworkRight
    }
}

// =============================
// 6. Fungsi untuk menangani klik tombol defect
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
// 7. Event Listeners untuk Plus dan Minus Buttons
// =============================
document.getElementById('plus-button').addEventListener('click', () => {
    isAdding = true; // Aktifkan mode penambahan
    isSubtracting = false; // Nonaktifkan mode pengurangan

    // Ubah kelas untuk tombol plus
    document.getElementById('plus-button').classList.add('active');
    document.getElementById('plus-button').classList.remove('inactive');

    // Ubah kelas untuk tombol minus
    document.getElementById('minus-button').classList.remove('active');
    document.getElementById('minus-button').classList.add('inactive');
});

document.getElementById('minus-button').addEventListener('click', () => {
    isAdding = false; // Nonaktifkan mode penambahan
    isSubtracting = true; // Aktifkan mode pengurangan

    // Ubah kelas untuk tombol minus
    document.getElementById('minus-button').classList.add('active');
    document.getElementById('minus-button').classList.remove('inactive');

    // Ubah kelas untuk tombol plus
    document.getElementById('plus-button').classList.remove('active');
    document.getElementById('plus-button').classList.add('inactive');
});

// =============================
// 8. Inisialisasi Aplikasi
// =============================
function init() {
    setupDefectButtons(); // Setup defect buttons
    setupQuantityButtons(); // Setup quantity buttons
}

// Tunggu hingga DOM dimuat sebelum menginisialisasi
document.addEventListener('DOMContentLoaded', init);

// =============================
// 9. Setup Quantity Buttons
// =============================
function setupQuantityButtons() {
    // Qty Inspect
    document.getElementById('plus-qty').addEventListener('click', function() {
        updateQuantity('qtyInspectOutput', 1);
    });

    document.getElementById('minus-qty').addEventListener('click', function() {
        updateQuantity('qtyInspectOutput', -1);
    });

    // Rework Kiri
    document.getElementById('plus-rework-kiri').addEventListener('click', function() {
        updateQuantity('left-counter', 1);
    });

    document.getElementById('minus-rework-kiri').addEventListener('click', function() {
        updateQuantity('left-counter', -1);
    });

    // Rework Kanan
    document.getElementById('plus-rework-kanan').addEventListener('click', function() {
        updateQuantity('right-counter', 1);
    });
            document.getElementById('minus-rework-kanan').addEventListener('click', function() {
        updateQuantity('right-counter', -1);
    });
}
// =============================
// 10. Kirim Data ke Google Sheets via Web App
// =============================

document.querySelector(".save-button").addEventListener("click", async () => {
  const fttOutputElement = document.getElementById("fttOutput");
  if (!fttOutputElement || !fttOutputElement.innerText.trim()) {
    alert("FTT value is missing!");
    return;
  }
  const ftt = fttOutputElement.innerText.replace("%", "").trim();

  console.log("FTT Value (before sending):", ftt);

  const data = {
    auditor: document.getElementById("auditor").value,
    ncvs: document.getElementById("ncvs").value,
    modelName: document.getElementById("model-name").value,
    styleNumber: document.getElementById("style-number").value,
    ftt: ftt + "%",
    qtyInspect: parseInt(document.getElementById("qtyInspectOutput").innerText, 10),
    reworkKanan: parseInt(document.getElementById("right-counter").innerText, 10),
    reworkKiri: parseInt(document.getElementById("left-counter").innerText, 10),
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz4fclKPmhZ3WtO41Ktx1YHzXDIQmJFnYRuswDylG3XzjxGlCKZuaK13XTFva1QKIoQzg/exec", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.text();
    alert(result);
  } catch (error) {
    alert("Terjadi kesalahan saat menyimpan data.");
    console.error(error);
  }
});
