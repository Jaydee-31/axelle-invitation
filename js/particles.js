function createPetals() {
  const layer = document.getElementById('petal-layer');
  const colors = ['#f9c8d8','#e8a0b4','#fde8f5','#fce0d0','#f9d6e0','#e8d5c8'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const c = colors[Math.floor(Math.random() * colors.length)];
    const size = 7 + Math.random() * 10;
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${size}px; height:${size*1.3}px;
      background:${c};
      animation-duration:${5+Math.random()*8}s;
      animation-delay:${Math.random()*10}s;
      opacity:0;
      transform:rotate(${Math.random()*360}deg);
      border-radius:50% 50% 50% 0;
    `;
    layer.appendChild(p);
  }
}

function createSparkles() {
  const layer = document.getElementById('sparkle-layer');
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = 2 + Math.random() * 4;
    s.style.cssText = `
      left:${Math.random()*95}%;
      top:${Math.random()*90}%;
      width:${size}px; height:${size}px;
      animation-duration:${2+Math.random()*3}s;
      animation-delay:${Math.random()*4}s;
    `;
    layer.appendChild(s);
  }
}
