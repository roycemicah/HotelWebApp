// Calendar
const checkInPicker = flatpickr("#check-in", {
  dateFormat: "Y-m-d",
  showMonths: 2,
  minDate: "today",
  mode: "range"
});

//Rooms and Guests increment and decrement headache
let roomCount = 1;

function totalClick(click, targetId) {
  const totalClicks = document.getElementById(targetId);
  let sumValue = parseInt(totalClicks.innerText) + click;

  if (targetId !== 'totalRooms' && sumValue < 0) {
    sumValue = 0;
  } else if (targetId === 'totalRooms' && sumValue < 1) {
    sumValue = 1;
  }

  totalClicks.innerText = sumValue.toString();

  if (targetId === 'totalRooms') {
    const roomContainer = document.querySelector('.room-container');
    const existingRooms = document.querySelectorAll('.room');

    if (sumValue < existingRooms.length) {
      for (let i = existingRooms.length - 1; i >= sumValue; i--) {
        existingRooms[i].remove();
      }
    } else if (sumValue > existingRooms.length) {
      for (let i = existingRooms.length + 1; i <= sumValue; i++) {
        const newRoom = createRoom(i);
        roomContainer.appendChild(newRoom);
      }
    }
  }

  addEventHandlers();
}

function resetQuantity(targetId) {
  const totalClicks = document.getElementById(targetId);
  if (targetId === 'totalRooms') {
    totalClicks.innerText = "1";
    const roomContainer = document.querySelector('.room-container');
    const existingRooms = document.querySelectorAll('.room');

    if (existingRooms.length > 1) {
      for (let i = existingRooms.length - 1; i >= 1; i--) {
        existingRooms[i].remove();
      }
    }
  } else {
    totalClicks.innerText = "0";
  }

  addEventHandlers();
}

function createRoom(roomNumber) {
  const room = document.createElement('div');
  room.className = 'room';

  const roomHeader = document.createElement('div');
  roomHeader.className = 'room-header';
  const roomHeaderText = document.createElement('span');
  roomHeaderText.innerText = 'Room ' + roomNumber;
  roomHeader.appendChild(roomHeaderText);

  const adultsContainer = document.createElement('div');
  adultsContainer.className = 'quantity-container';
  adultsContainer.id = 'quantity-search';
  const adultsText = document.createElement('span');
  adultsText.innerText = 'Adults';
  adultsContainer.appendChild(adultsText);
  const adultsInput = createQuantityInput('totalAdults' + roomNumber, 'decrement', 'increment');
  adultsContainer.appendChild(adultsInput);

  const childrenContainer = document.createElement('div');
  childrenContainer.className = 'quantity-container';
  childrenContainer.id = 'quantity-search';
  const childrenText = document.createElement('span');
  childrenText.innerText = 'Children';
  childrenContainer.appendChild(childrenText);
  const childrenInput = createQuantityInput('totalChildren' + roomNumber, 'decrement', 'increment');
  childrenContainer.appendChild(childrenInput);

  room.appendChild(roomHeader);
  room.appendChild(adultsContainer);
  room.appendChild(childrenContainer);

  return room;
}

function createQuantityInput(targetId, decrementClass, incrementClass) {
  const quantityInput = document.createElement('div');
  quantityInput.className = 'quantity-input';

  const quantityControls = document.createElement('p');

  const decrementButton = document.createElement('button');
  decrementButton.className = decrementClass;
  decrementButton.innerText = '-';
  decrementButton.setAttribute('onclick', `totalClick(-1, '${targetId}')`);
  quantityControls.appendChild(decrementButton);

  const quantityValue = document.createElement('span');
  quantityValue.id = targetId;
  quantityValue.innerText = '0';
  quantityControls.appendChild(quantityValue);

  const incrementButton = document.createElement('button');
  incrementButton.className = incrementClass;
  incrementButton.innerText = '+';
  incrementButton.setAttribute('onclick', `totalClick(1, '${targetId}')`);
  quantityControls.appendChild(incrementButton);

  quantityInput.appendChild(quantityControls);

  const resetButton = document.createElement('button');
  resetButton.className = 'resetQuantity';
  resetButton.innerText = 'RESET';
  resetButton.setAttribute('onclick', `resetQuantity('${targetId}')`);
  quantityInput.appendChild(resetButton);

  return quantityInput;
}

// Keep the dropdown persistent
function addEventHandlers() {
  const roomHeaders = document.querySelectorAll('.room-header');
  const adultsDecrementButtons = document.querySelectorAll('.room .quantity-container .decrement');
  const adultsIncrementButtons = document.querySelectorAll('.room .quantity-container .increment');
  const childrenDecrementButtons = document.querySelectorAll('.room .quantity-container:last-child .decrement');
  const childrenIncrementButtons = document.querySelectorAll('.room .quantity-container:last-child .increment');
  const resetButtons = document.querySelectorAll('.room .quantity-container .resetQuantity');
  const resetLastChildButtons = document.querySelectorAll('.room .quantity-container:last-child .resetQuantity');

  roomHeaders.forEach(roomHeader => {
    roomHeader.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  adultsDecrementButtons.forEach(decrementButton => {
    decrementButton.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  adultsIncrementButtons.forEach(incrementButton => {
    incrementButton.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  childrenDecrementButtons.forEach(decrementButton => {
    decrementButton.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  childrenIncrementButtons.forEach(incrementButton => {
    incrementButton.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  resetButtons.forEach(resetButton => {
    resetButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const targetId = resetButton.parentNode.parentNode.querySelector('span').id;
      resetQuantity(targetId);
    });
  });

  resetLastChildButtons.forEach(resetButton => {
    resetButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const targetId = resetButton.parentNode.parentNode.querySelector('span').id;
      resetQuantity(targetId);
    });
  });

  const dropdownItem = document.querySelector('.dropdown-item');
  dropdownItem.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

// Initial set up - display one room
totalClick(0, 'totalRooms');
addEventHandlers();

