// URL Google Apps Script Web App
const scriptURL = 'https://script.google.com/macros/s/AKfycbyGDKUHTehjRu_0uDAMDQh4NbGPZyDRVrzp4Vu83Tk/dev';

// Global object to store defect counts
const defectCounts = {};

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
            option.value = auditor;
            option.textContent = auditor;
            auditorSelect.appendChild(option);
        });
    }

    // Populate NCVS dropdown
    if (data.ncvs) {
        ncvsSelect.innerHTML = '';
        data.ncvs.forEach(ncvs => {
            const option = document.createElement('option');
            option.value = ncvs;
            option.textContent = ncvs;
            ncvsSelect.appendChild(option);
        });
    }
}

// Render data into a table
function renderData(data) {
    const table = document.getElementById('data-table');
    table.innerHTML = `
        <tr>
            <th>Timestamp</th>
            <th>Auditor</th>
            <th>NCVS</th>
            <th>Model</th>
            <th>Rework Kanan</th>
            <th>Rework Kiri</th>
        </tr>`;

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.timestamp}</td>
            <td>${row.auditor}</td>
            <td>${row.ncvs}</td>
            <td>${row.model}</td>
            <td>${row.reworkRight}</td>
            <td>${row.reworkLeft}</td>`;
        table.appendChild(tr);
    });
}

// Handle defect button clicks
function handleDefectClick(defectName) {
    if (defectCounts[defectName]) {
        defectCounts[defectName]++;
    } else {
        defectCounts[defectName] = 1;
    }
    updateSummary();
}

// Update summary defect menu
function updateSummary() {
    const summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = ''; // Clear previous summary

    for (const [defect, count] of Object.entries(defectCounts)) {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.textContent = `${defect} : ${count}`;
        summaryList.appendChild(summaryItem);
    }
}

// Setup defect buttons
function setupDefectButtons() {
    const defectButtons = document.querySelectorAll('.defect-button');
    defectButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleDefectClick(button.textContent);
        });
    });
}

// Submit form data
async function submitForm() {
    const form = document.getElementById('qc-form');
    const formData = {
        auditor: form.elements['auditor'].value,
        ncvs: form.elements['ncvs'].value,
        model: form.elements['model'].value,
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
            fetchData(); // Refresh data
        } else {
            alert('Gagal mengirim data!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Setup action buttons for counters
function setupActionButtons() {
    const minusButton = document.querySelector('.minus');
    const plusButton = document.querySelector('.plus');

    minusButton.addEventListener('click', () => {
        console.log('Minus button clicked');
        // Add logic for minus button
    });

    plusButton.addEventListener('click', () => {
        console.log('Plus button clicked');
        // Add logic for plus button
    });

    const leftReworkButton = document.getElementById('left-rework');
    const rightReworkButton = document.getElementById('right-rework');

    leftReworkButton.addEventListener('click', () => updateCounter('left'));
    rightReworkButton.addEventListener('click', () => updateCounter('right'));
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

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', init);
