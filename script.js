const pieces = document.querySelectorAll('.piece');
const zones = document.querySelectorAll('.drop-zone');
const checkButton = document.getElementById('check-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');

// السحب والإفلات باستخدام الماوس واللمس
pieces.forEach(piece => {
  piece.addEventListener('dragstart', dragStart);
  piece.addEventListener('dragend', dragEnd);

  // إضافة دعم اللمس
  piece.addEventListener('touchstart', touchStart);
  piece.addEventListener('touchend', touchEnd);
  piece.addEventListener('touchmove', touchMove);
});

zones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', dropPiece);

  // إضافة دعم اللمس
  zone.addEventListener('touchmove', touchMoveOverZone);
  zone.addEventListener('touchend', dropPiece);
});

let draggedPiece = null;
let touchTimeout = null;

function dragStart() {
  draggedPiece = this;
}

function dragEnd() {
  draggedPiece = null;
}

function dragOver(e) {
  e.preventDefault();
}

function dropPiece(e) {
  e.preventDefault();
  if (!this.hasChildNodes() && draggedPiece) {
    this.appendChild(draggedPiece);
  }
}

// دعم اللمس (الضغط المطول)
function touchStart(e) {
  e.preventDefault();
  touchTimeout = setTimeout(() => {
    draggedPiece = this;
  }, 300); // تحديد مدة الضغط المطول
}

function touchEnd(e) {
  clearTimeout(touchTimeout);
}

function touchMove(e) {
  e.preventDefault();
  if (draggedPiece) {
    const touchLocation = e.targetTouches[0];
    draggedPiece.style.position = "absolute";
    draggedPiece.style.left = `${touchLocation.pageX - draggedPiece.offsetWidth / 2}px`;
    draggedPiece.style.top = `${touchLocation.pageY - draggedPiece.offsetHeight / 2}px`;
  }
}

function touchMoveOverZone(e) {
  e.preventDefault();
  if (!this.hasChildNodes() && draggedPiece) {
