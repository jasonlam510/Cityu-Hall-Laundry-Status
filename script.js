const zfill = (num, size) => {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

document.addEventListener('DOMContentLoaded', function() {
  const dryerContainer = document.getElementById('dryer-container');
  const washerContainer = document.getElementById('washer-container');
  const hallNoSelect = document.getElementById('hallNo');
  const reloadTime = 10
  let countdown = reloadTime;
  const countdownElement = document.getElementById('countdown');
  const loadingEle = document.getElementsByClassName("loading")
  const landry = document.getElementsByClassName("laundry")

  // Populate the dropdown with options for halls 1 to 17, except hall 13
  for (let i = 1; i <= 17; i++) {
    if (i == 13) continue;
    const option = document.createElement('option');
    option.value = zfill(i, 2);
    option.textContent = i;
    hallNoSelect.appendChild(option);
  }

  // Set the default selection based on URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const hallNoParam = urlParams.get('HallNo');
  if (hallNoParam && hallNoParam >= 1 && hallNoParam <= 11) {
    hallNoSelect.value = zfill(hallNoParam, 2);
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

  function updateCountdown() {
    countdownElement.textContent = `${countdown}s to reload`;
    countdown -= 1;
  
    if (countdown < 0) {
      countdown = 10;
    }
  }

  function startLoading() {
    loadingEle[0].style.display = "block";
    landry[0].style.display = "none";
  }

  function endLoading() {
    loadingEle[0].style.display = "none";
    landry[0].style.display = "block";
  }

  function updateLaundryStatus(data) {
    console.log(data)
    endLoading()
    dryerContainer.innerHTML = '';
    washerContainer.innerHTML = '';
    data.forEach(machine => {
      const machineElem = document.createElement('div');
      machineElem.className = 'machine';
  
      const machineType = machine["Machine Type"] === 'W' ? 'Washer' : 'Dryer';
      const machineID = machineType[0] + parseInt(machine["Machine ID"], 10); // Remove leading zero
      const leftTime = parseInt(machine["Left Time"], 10);
      const machineImg = machine["Status"] === 'U'? 'media/Out of Service.png': `media/${machineType.toLowerCase()}-icon.svg`;
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
        <img src="${machineImg}" alt="${machineType}" width="70" height="70" />
        <div class="status">${statusText}</div>
        <div class="time-left">${timeLeftText}</div>
      `;
  
      if (machineType === 'Washer') {
        washerContainer.appendChild(machineElem);
      } else {
        dryerContainer.appendChild(machineElem);
      }
    });
    countdown = reloadTime;
  }

  hallNoSelect.addEventListener('change', function(event) {
    const selectedHallNo = event.target.value;
    if (history.pushState) {
      const newurl = new URL(window.location.href);
      newurl.searchParams.set('HallNo', selectedHallNo); // Set the HallNo parameter
      window.history.pushState({ path: newurl.href }, '', newurl.href);
    }
    startLoading();
    fetchLaundryData(); // Fetch data for the selected hall
  });

  
  
  // Update the countdown every second
  setInterval(updateCountdown, reloadTime/10 * 1000);

  // Fetch laundry data every 10 seconds
  setInterval(fetchLaundryData, reloadTime * 1000);

  // Initial fetch
  fetchLaundryData();
});
