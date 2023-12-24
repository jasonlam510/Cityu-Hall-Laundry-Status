document.addEventListener('DOMContentLoaded', function() {
  const dryerContainer = document.getElementById('dryer-container');
  const washerContainer = document.getElementById('washer-container');
  const hallNoSelect = document.getElementById('hallNo');

  // Populate the dropdown with options for halls 1 to 11
  for (let i = 1; i <= 11; i++) {
    const option = document.createElement('option');
    option.value = i < 10 ? `0${i}` : `${i}`;
    option.textContent = i;
    hallNoSelect.appendChild(option);
  }

  // Set the default selection based on URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const hallNoParam = urlParams.get('HallNo');
  if (hallNoParam && hallNoParam >= 1 && hallNoParam <= 11) {
    hallNoSelect.value = hallNoParam < 10 ? `0${hallNoParam}` : hallNoParam;
  }

  function fetchLaundryData() {
    const selectedHallNo = hallNoSelect.value;
    const fetchUrl = `https://misc.cityu-sro.hk/WMStatus/WMStatus.aspx?HallNo=${selectedHallNo}`;
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        updateLaundryStatus(data);
      })
      .catch(error => {
        console.error('Error fetching laundry data:', error);
      });
  }

  function updateLaundryStatus(data) {
    dryerContainer.innerHTML = '';
    washerContainer.innerHTML = '';
    
    data.forEach(machine => {
      const machineElem = document.createElement('div');
      machineElem.className = 'machine';
  
      const machineType = machine["Machine Type"] === 'W' ? 'Washer' : 'Dryer';
      const machineID = machineType[0] + parseInt(machine["Machine ID"], 10); // Remove leading zero
      const leftTime = parseInt(machine["Left Time"], 10);
      const machineImg = machine["Status"] === 'U'? 'Out of Service': machineType;
      let statusText = '';
      let timeLeftText = '';

  
      if (machine["Status"] === 'U') {
        statusText = 'Out of Service';
      } else {
        statusText = leftTime > 0 ? 'In Use' : 'Available';
        timeLeftText = leftTime > 0 ? `(${leftTime} mins left)` : '';
        if (leftTime > 0) {
          machineElem.classList.add('in-use-filter'); // Add class when machine is in use
        }
      }
  
      machineElem.innerHTML = `
        <div class="machine-id">${machineID}</div>
        <img src="${machineImg}.png" alt="${machineType}" />
        <div class="status">${statusText}</div>
        <div class="time-left">${timeLeftText}</div>
      `;
  
      if (machineType === 'Washer') {
        washerContainer.appendChild(machineElem);
      } else {
        dryerContainer.appendChild(machineElem);
      }
    });
  }

  hallNoSelect.addEventListener('change', fetchLaundryData);

  // Initial fetch
  fetchLaundryData();
  
});
