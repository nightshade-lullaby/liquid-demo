setInterval(()=>{
  clock.textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
},1000);

const wallpaper = document.getElementById('wallpaper');
document.addEventListener('mousemove', e => {
  const x = (e.clientX/window.innerWidth - 0.5)*20;
  const y = (e.clientY/window.innerHeight - 0.5)*20;
  wallpaper.style.transform = `translate(${x}px, ${y}px)`;
});

const icons = document.querySelectorAll('.dock-icon');

dock.addEventListener('mousemove', e => {
  icons.forEach(icon => {
    const rect = icon.getBoundingClientRect();
    const dist = Math.abs(e.clientX - (rect.left + rect.width/2));
    const scale = Math.max(1, 1.8 - dist/100);
    icon.style.transform = `scale(${scale})`;
  });
});

dock.addEventListener('mouseleave', ()=>{
  icons.forEach(i=>i.style.transform='scale(1)');
});

const calcApp = document.getElementById('calculatorApp');

function openCalculator(e){
  calcApp.classList.remove('hidden');

  const rect = e.target.getBoundingClientRect();
  calcApp.style.left = rect.left + 'px';
  calcApp.style.top = rect.top + 'px';

  requestAnimationFrame(()=>{
    calcApp.classList.add('active');
  });
}

function closeApp(){
  calcApp.classList.remove('active');
  setTimeout(()=> calcApp.classList.add('hidden'), 200);
}

function calculate(){
  const val = document.getElementById('calcInput').value;
  try {
    document.getElementById('calcResult').textContent = eval(val);
  } catch {
    document.getElementById('calcResult').textContent = 'Error';
  }
}

const root = document.documentElement;

const img = new Image();
img.src = 'wallpaper.jpg';
img.onload = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img,0,0);

  const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let brightness = 0;

  for(let i=0;i<data.length;i+=4){
    brightness += data[i] + data[i+1] + data[i+2];
  }

  brightness /= (data.length/4*3);

  const blur = brightness > 127 ? 20 : 35;
  root.style.setProperty('--blur', blur+'px');
};
