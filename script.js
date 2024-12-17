// URL Google Apps Script Web App
const scriptURL = 'https://script.google.com/macros/s/AKfycbyGDKUHTehjRu_0uDAMDQh4NbGPZyDRVrzp4Vu83Tk/dev';

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

// Function to fetch data from the database
async function fetchData() {
    try {
        const response = await fetch(scriptURL);
        const data = await response.json();
        console.log('Data fetched successfully:', data);
        populateFields(data);
        renderData(data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Populate dropdown fields
function populateFields(data) {
    const auditorSelect = document.getElementById('auditor');
    const ncvsSelect = document.getElementById('ncvs');

    // Populate Auditor dropdown
    if (data.auditors) {
        auditorSelect.innerHTML = '';
        data.auditors.forEach(auditor => {
            const option = document.createElement('option');
            option.value = auditor.trim();
            option.textContent = auditor.trim();
            auditorSelect.appendChild(option);
        });
    }

    // Populate NCVS dropdown
    if (data.ncvs) {
        ncvsSelect.innerHTML = '';
        data.ncvs.forEach(ncvs => {
            const option = document.createElement('option');
            option.value = ncvs.trim();
            option.textContent = ncvs.trim();
            ncvsSelect.appendChild(option);
        });
    }
}

// Render data into a table
function renderData(data) {
    const table = document.getElementById('data-table');
    table.innerHTML = 
        <tr>
            <th>Timestamp</th>
            <th>Auditor</th>
            <th>NCVS</th>
            <th>Model</th>
            <th>Rework Kanan</th>
            <th>Rework Kiri</th>
        </tr>;

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = 
            <td>${row.timestamp || '-'}</td>
            <td>${row.auditor || '-'}</td>
            <td>${row.ncvs || '-'}</td>
            <td>${row.model || '-'}</td>
            <td>${row.reworkRight || 0}</td>
            <td>${row.reworkLeft || 0}</td>;
        table.appendChild(tr);
    });
}

// Handle defect button clicks
function handleDefectClick(defectName) {
    // Pastikan nama defect ada di defectCounts
    if (defectCounts.hasOwnProperty(defectName)) {
        defectCounts[defectName]++;
        console.log(Defect ${defectName} updated to ${defectCounts[defectName]});
    } else {
        console.warn(Defect '${defectName}' tidak dikenali.);
    }

    // Perbarui menu summary defect
    updateDefectSummary();
}

// Update defect summary (update counters next to defect items)
function updateDefectSummary() {
    const summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = ''; // Hapus isi sebelumnya

    // Iterasi semua cacat dan jumlah klik dari defectCounts
    for (const [defect, count] of Object.entries(defectCounts)) {
        if (count > 0) {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.textContent = ${defect}: ${count};
            summaryList.appendChild(summaryItem);
        }
    }
}

// Setup defect buttons
function setupDefectButtons() {
    const defectButtons = document.querySelectorAll('.defect-button');
    defectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const defectName = button.textContent.trim();
            handleDefectClick(defectName);
            button.classList.add('active'); // Visual feedback
            setTimeout(() => button.classList.remove('active'), 200); // Hilangkan setelah 200ms
        });
    });
}

// Submit form data
async function submitForm() {
    const form = document.getElementById('qc-form');
    const formData = {
        auditor: form.elements['auditor'].value.trim(),
        ncvs: form.elements['ncvs'].value.trim(),
        model: form.elements['model'].value.trim(),
        reworkRight: parseInt(document.getElementById('right-counter').textContent) || 0,
        reworkLeft: parseInt(document.getElementById('left-counter').textContent) || 0,
        defects: defectCounts
    };

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();

        if (data.success) {
            alert('Data berhasil dikirim!');
            resetForm();
            fetchData();
        } else {
            alert('Gagal mengirim data!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Reset form and counters
function resetForm() {
    document.getElementById('qc-form').reset();
    Object.keys(defectCounts).forEach(key => defectCounts[key] = 0);
    updateDefectSummary();
    document.getElementById('left-counter').textContent = 0;
    document.getElementById('right-counter').textContent = 0;
    leftClickCount = 0;
    rightClickCount = 0;
}

// Setup action buttons for counters
function setupActionButtons() {
    document.getElementById('left-rework').addEventListener('click', () => updateCounter('left'));
    document.getElementById('right-rework').addEventListener('click', () => updateCounter('right'));
}

let leftClickCount = 0;
let rightClickCount = 0;

function updateCounter(side) {
    if (side === 'left') {
        leftClickCount++;
        document.getElementById('left-counter').textContent = leftClickCount;
    } else if (side === 'right') {
        rightClickCount++;
        document.getElementById('right-counter').textContent = rightClickCount;
    }
}

// Initialize the app
function init() {
    fetchData();
    setupActionButtons();
    setupDefectButtons();
}

