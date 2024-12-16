// Connect to the Google Apps Script Web App
const scriptURL = 'https://script.google.com/macros/s/AKfycbyGDKUHTehjRu_0uDAMDQh4NbGPZyDRVrzp4Vu83Tk/dev';

// Function to fetch data from the database
async function fetchData() {
    try {
        const response = await fetch(scriptURL);
        const data = await response.json();
        console.log('Data fetched successfully:', data);
        populateFields(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Populate fields with data
function populateFields(data) {
    const auditorSelect = document.getElementById('auditor');
    const ncvsSelect = document.getElementById('ncvs');

    // Populate Auditor dropdown
    if (data.auditors) {
        data.auditors.forEach(auditor => {
            const option = document.createElement('option');
            option.value = auditor;
            option.textContent = auditor;
            auditorSelect.appendChild(option);
        });
    }

    // Populate NCVS dropdown
    if (data.ncvs) {
        data.ncvs.forEach(ncvs => {
            const option = document.createElement('option');
            option.value = ncvs;
            option.textContent = ncvs;
            ncvsSelect.appendChild(option);
        });
    }
}

// Event listener for action buttons
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
        document.getElementById('left-counter').textContent = leftClickCount; // Update counter kiri
    } else if (side === 'right') {
        rightClickCount++;
        document.getElementById('right-counter').textContent = rightClickCount; // Update counter kanan
    }
}

// Initialize the app
function init() {
    fetchData();
    setupActionButtons();
}

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', init);

// Submit form data
function submitForm() {
    const form = document.getElementById('qc-form');
    const formData = {
      auditor: form.elements['auditor'].value,
      ncvs: form.elements['ncvs'].value,
      model: form.elements['model'].value,
      reworkRight: parseInt(document.getElementById('right-counter').textContent), // Ambil nilai counter rework kanan
      reworkLeft: parseInt(document.getElementById('left-counter').textContent), // Ambil nilai counter rework kiri
    };
  
    fetch('https://script.google.com/macros/s/AKfycbyGDKUHTehjRu_0uDAMDQh4NbGPZyDRVrzp4Vu83Tk/dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Data berhasil dikirim!");
          fetchData(); // Ambil data terbaru untuk ditampilkan
        } else {
          alert("Gagal mengirim data!");
        }
      })
      .catch(error => console.error('Error:', error));
}
  
function fetchData() {
    fetch('https://script.google.com/macros/s/AKfycbyGDKUHTehjRu_0uDAMDQh4NbGPZyDRVrzp4Vu83Tk/dev')
      .then(response => response.json())
      .then(data => {
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
        renderData(data.data);
      });
    // Global object to store defect counts
const defectCounts = {};

// Function to handle defect button clicks
function handleDefectClick(defectName) {
    // Increment the count for the clicked defect
    if (defectCounts[defectName]) {
        defectCounts[defectName]++;
    } else {
        defectCounts[defectName] = 1;
    }
    updateSummary();
}

// Function to update the summary display
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

// Add event listeners to defect buttons
function setupDefectButtons() {
    const defectButtons = document.querySelectorAll('.defect-button');
    defectButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleDefectClick(button.textContent);
        });
    });
}

// Modify the init function to include setup for defect buttons
function init() {
    fetchData();
    setupActionButtons();
    setupDefectButtons(); // Setup defect buttons
}

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', init);
}
