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
}

// Initialize the app
function init() {
    fetchData();
    setupActionButtons();
}

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', init);
