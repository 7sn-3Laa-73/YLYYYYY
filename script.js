const pieces = document.querySelectorAll('.piece');
const zones = document.querySelectorAll('.drop-zone');
const checkButton = document.getElementById('check-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');

// السحب والإفلات
pieces.forEach(piece => {
  piece.addEventListener('dragstart', dragStart);
  piece.addEventListener('dragend', dragEnd);
});

zones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', dropPiece);
});

let draggedPiece = null;

function dragStart() {
  draggedPiece = this;
}

function dragEnd() {
  draggedPiece = null;
}

function dragOver(e) {
  e.preventDefault();
}

function dropPiece() {
  if (!this.hasChildNodes()) {
    this.appendChild(draggedPiece);
  }
}

// تحقق من صحة تجميع البازل
checkButton.addEventListener('click', () => {
  let correct = true;

  zones.forEach((zone, index) => {
    const piece = zone.querySelector('img');
    if (piece && piece.id !== `piece-${index + 1}`) {
      correct = false;
    }
  });

  if (correct) {
    showPopup("You won! 🏆<br>Get ready for the 'Learn How to Learn' session!<br>Prepare for cinema surprises! 🎬");
  } else {
    showPopup("Try again! 😔");
  }
});

function showPopup(message) {
  popupMessage.innerHTML = message;
  popup.classList.remove('hidden');
}

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});
