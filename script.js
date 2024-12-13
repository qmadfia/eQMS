
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
