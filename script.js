// Live Clock
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

setInterval(updateClock, 1000);
updateClock();

// Draggable Window
const windowEl = document.getElementById('mainWindow');
let isDragging = false;
let offsetX, offsetY;

windowEl.querySelector('.window-header').addEventListener('mousedown', e => {
  isDragging = true;
  offsetX = e.clientX - windowEl.offsetLeft;
  offsetY = e.clientY - windowEl.offsetTop;
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  windowEl.style.position = 'absolute';
  windowEl.style.left = `${e.clientX - offsetX}px`;
  windowEl.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});