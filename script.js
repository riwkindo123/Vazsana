// ดึง element ต่างๆ
const pot         = document.getElementById('pot');
const potLid      = document.getElementById('pot-lid');
const potBody     = document.getElementById('pot-body');
const potLogo     = document.getElementById('pot-logo');
const fortuneStick= document.getElementById('fortune-stick');
const stickNumber = document.getElementById('stick-number');
const shakeButton = document.getElementById('shake-button');
const historyButton = document.getElementById('history-button');
const resultPopup = document.getElementById('result-popup');
const resultNumber= document.getElementById('result-number');
const resultText  = document.getElementById('result-text');
const closeResult = document.getElementById('close-result');
const historyContainer = document.getElementById('history-container');
const closeHistory = document.getElementById('close-history');
const historyList = document.getElementById('history-list');
const particlesContainer = document.getElementById('particles-container');
const sparklesContainer = document.getElementById('sparkles-container');
const clickArea   = document.getElementById('click-area');
const potGlow     = document.getElementById('pot-glow');

// ตั้งค่าโลโก้
potLogo.style.backgroundImage = "url('https://vazsana.com/wp-content/uploads/2025/03/sa1.png')";

// ไม้เซียมซีภายใน
const innerSticks = [
  document.getElementById('inner-stick-01'),
  document.getElementById('inner-stick-02'),
  document.getElementById('inner-stick-03'),
  document.getElementById('inner-stick-04'),
  document.getElementById('inner-stick-05'),
];

// สุ่มตำแหน่งไม้ภายใน
function randomizeStickPositions() {
  innerSticks.forEach(stick => {
    const angle = (Math.random()*3)-1.5;
    const y     = (Math.random()*8)-4;
    const curr  = window.getComputedStyle(stick).transform;
    stick.style.transform = `${curr} rotate(${angle}deg) translateY(${y}px)`;
  });
}
randomizeStickPositions();

// ข้อความคำทำนาย
const fortunes = [
  "โชคดีมาก! การงานจะก้าวหน้า การเงินคล่องตัว ความรักเบ่งบาน",
  "โชคปานกลาง ระวังเรื่องการเงิน แต่ความรักจะมั่นคง",
  "ต้องอดทนในช่วงนี้ แต่จะผ่านพ้นอุปสรรคไปได้ด้วยดี",
  "มีคนคิดถึงคุณอยู่ห่างๆ อาจได้รับข่าวดีเร็วๆ นี้",
  "ระวังการตัดสินใจผิดพลาด ควรปรึกษาผู้ใหญ่ก่อนทำการใหญ่",
  "จะได้ลาภผลที่คาดไม่ถึง อาจมาจากคนที่ไม่คาดคิด",
  "สุขภาพต้องระวัง ควรพักผ่อนให้เพียงพอ",
  "จะได้เดินทางไกล พบเจอสิ่งใหม่ๆ ที่น่าตื่นเต้น",
  "มีเกณฑ์ได้เลื่อนตำแหน่ง หรือเปลี่ยนงานที่ดีกว่าเดิม",
  "ความรักกำลังจะเข้ามา เตรียมใจให้พร้อม",
  "การเงินไม่คล่องตัว ควรประหยัดและอดออม",
  "จะได้พบมิตรที่ดี ช่วยเหลือในยามยาก",
  "ระวังคนใกล้ตัวที่ไม่หวังดี จงเลือกคบคนให้ดี",
  "ความพยายามจะส่งผล จงอดทนต่อไป",
  "โชคลาภจะมาถึง แต่อย่าประมาท",
  "ควรทำบุญทำทาน จะช่วยส่งเสริมดวงชะตา",
  "จะได้รับข่าวดีจากที่ไกล อาจเป็นโอกาสครั้งสำคัญ",
  "ระวังการเดินทาง ควรตรวจสอบยานพาหนะให้พร้อม",
  "จะมีคนมาขอความช่วยเหลือ การช่วยเหลือผู้อื่นจะนำโชคดีมาให้",
  "ความรักที่ผ่านมาจะกลับมาใหม่ ให้โอกาสอีกครั้ง",
  "จะได้รับของขวัญพิเศษจากคนที่คุณไม่คาดคิด"
];

let history = [];
let isAnimating = false;

function createParticles() {
  particlesContainer.innerHTML = '';
  for (let i=0; i<20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.setProperty('--x-offset', `${Math.random()*100-50}px`);
    particlesContainer.appendChild(p);
  }
}
function createSparkles() {
  sparklesContainer.innerHTML = '';
  for (let i=0; i<15; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    sparklesContainer.appendChild(s);
  }
}
function animateParticles() {
  document.querySelectorAll('.particle').forEach((p,i)=>{
    p.style.left = `${Math.random()*200+10}px`;
    p.style.top  = `${Math.random()*100+100}px`;
    setTimeout(()=> p.style.animation = `floatParticle ${1+Math.random()*2}s ease-out forwards`, i*50);
  });
}
function animateSparkles() {
  document.querySelectorAll('.sparkle').forEach((s,i)=>{
    const ang = Math.random()*2*Math.PI, dist = 80+Math.random()*40;
    s.style.left = `${100+Math.cos(ang)*dist}px`;
    s.style.top  = `${40 +Math.sin(ang)*dist}px`;
    setTimeout(()=> s.style.animation = `sparkleAnim ${0.5+Math.random()}s ease-out`, i*100+300);
  });
}
function animatePotGlow() {
  potGlow.style.animation = 'glowPulse 1.5s ease-in-out';
}

function shakeAnimation() {
  if (isAnimating) return;
  isAnimating = true;
  shakeButton.disabled = true;
  createParticles(); createSparkles();
  potBody.style.animation = 'shake 1s ease-in-out';
  innerSticks.forEach(s=> s.style.animation='shake 1s ease-in-out');

  setTimeout(()=>{
    potBody.style.animation=''; innerSticks.forEach(s=> s.style.animation='');
    const idx = Math.floor(Math.random()*fortunes.length);
    const txt = fortunes[idx];
    stickNumber.textContent = idx+1;
    potLid.style.animation = 'openLid 0.3s forwards';
    animatePotGlow();

    setTimeout(()=>{
      animateSparkles();
      fortuneStick.style.opacity = 1;
      fortuneStick.style.animation = 'stickEject 0.4s ease-out forwards';
      animateParticles();

      const now = new Date();
      const dateStr = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
      history.unshift({ number: idx+1, text: txt, date: dateStr });
      updateHistoryList();

      setTimeout(()=>{
        showResult(idx+1, txt);
        setTimeout(()=>{
          potLid.style.animation=''; fortuneStick.style.opacity=0; fortuneStick.style.animation='';
          potGlow.style.animation=''; isAnimating=false; shakeButton.disabled=false;
          randomizeStickPositions();
        },500);
      },500);
    },300);
  },1000);
}

function showResult(num, text) {
  resultNumber.textContent = num;
  resultText.textContent = text;
  resultPopup.style.opacity = '1';
  resultPopup.style.pointerEvents = 'auto';
  document.querySelector('.result-content').style.transform = 'scale(1)';
}

function updateHistoryList() {
  if (!history.length) {
    historyList.innerHTML = '<div style="padding:20px;color:#666;">ยังไม่มีประวัติการเสี่ยงเซียมซี</div>';
    return;
  }
  historyList.innerHTML = '';
  history.forEach(item=>{
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `<div class="history-number">${item.number}</div>
                     <div><div>${item.text}</div><div style="font-size:12px;color:#666;">${item.date}</div></div>`;
    historyList.appendChild(div);
  });
}

shakeButton.addEventListener('click', shakeAnimation);
clickArea.addEventListener('click', shakeAnimation);
historyButton.addEventListener('click', ()=>{
  historyContainer.style.opacity = '1';
  historyContainer.style.pointerEvents = 'auto';
  document.querySelector('.history-content').style.transform = 'scale(1)';
});
closeResult.addEventListener('click', ()=>{
  resultPopup.style.opacity = '0';
  resultPopup.style.pointerEvents = 'none';
  document.querySelector('.result-content').style.transform = 'scale(0.9)';
});
closeHistory.addEventListener('click', ()=>{
  historyContainer.style.opacity = '0';
  historyContainer.style.pointerEvents = 'none';
  document.querySelector('.history-content').style.transform = 'scale(0.9)';
});