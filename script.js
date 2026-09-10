const imgs=[...Array(45)].map((_,i)=>`assets/images/${String(i).padStart(2,'0')}.webp`);
const categories={
 'Weddings':[0,1,4,18,19,27,31,32,35,41],
 'Couples':[7,8,13,20,30,33],
 'Portraits':[2,11,24,25,44],
 'Traditional':[3,12,15,21,26,29,32],
 'Baby & Family':[10,16,22,28,37,40,43],
 'Pre-Wedding':[5,14,38,42],
 'Events':[6,9,34,36],
 'Fashion':[17,23,39]
};
const descriptions={Weddings:'Stories of celebration, emotion and connection.',Couples:'Real people. Real emotions.',Portraits:'People, personality and expression.',Traditional:'Culture, rituals and beautiful traditions.','Baby & Family':'Little moments, lifelong memories.','Pre-Wedding':'Romantic stories before the big day.','Events':'Music, people and special moments.',Fashion:'Style, confidence and expression.'};
const categoryFor=i=>Object.keys(categories).find(k=>categories[k].includes(i))||'Other';

const categoryFilters=document.getElementById('categoryFilters');
const categoryPreview=document.getElementById('categoryPreview');
const categoryMasonry=document.getElementById('categoryMasonry');
const categoryPreviewTitle=document.getElementById('categoryPreviewTitle');
const categoryPreviewDesc=document.getElementById('categoryPreviewDesc');

Object.keys(categories).forEach((name,i)=>{
  const b=document.createElement('button');
  b.className='filter category-filter'+(i===0?' active':'');
  b.textContent=name;
  b.dataset.filter=name;
  categoryFilters.appendChild(b);
});

function renderCategory(name){
  categoryPreviewTitle.textContent=name;
  categoryPreviewDesc.textContent=descriptions[name]||'A selection from the PHOTO HUB collection.';
  categoryMasonry.innerHTML='';
  categories[name].forEach(i=>{
    const f=document.createElement('figure');
    f.innerHTML=`<img loading="lazy" src="${imgs[i]}" alt="${name} photograph by PHOTO HUB"><span class="tag">${name.toUpperCase()}</span>`;
    f.onclick=()=>openLightbox(i);
    categoryMasonry.appendChild(f);
  });
}

categoryFilters.addEventListener('click',e=>{
  const b=e.target.closest('.category-filter');
  if(!b)return;
  document.querySelectorAll('.category-filter').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  renderCategory(b.dataset.filter);
});
renderCategory('Weddings');

// A Glimpse is intentionally a curated mixed selection, not a second category gallery.
const glimpse=[19,44,30,28,5,34,13,17,10,31,2,38];
const masonry=document.getElementById('masonry');
glimpse.forEach(i=>{
  const cat=categoryFor(i);
  const f=document.createElement('figure');
  f.innerHTML=`<img loading="lazy" src="${imgs[i]}" alt="${cat} photograph by PHOTO HUB"><span class="tag">${cat.toUpperCase()}</span>`;
  f.onclick=()=>openLightbox(i);
  masonry.appendChild(f);
});

const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lightboxImg'),lbCap=document.getElementById('lbCaption');
let active=0;
function openLightbox(i){active=i;lb.classList.add('open');lb.setAttribute('aria-hidden','false');updateLB();document.body.style.overflow='hidden'}
function updateLB(){lbImg.src=imgs[active];lbImg.alt=categoryFor(active)+' photograph by PHOTO HUB';lbCap.textContent=categoryFor(active).toUpperCase()+' · '+String(active+1).padStart(2,'0')}
function closeLB(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('.close').onclick=closeLB;
document.querySelector('.prev').onclick=()=>{active=(active+44)%45;updateLB()};
document.querySelector('.next').onclick=()=>{active=(active+1)%45;updateLB()};
lb.addEventListener('click',e=>{if(e.target===lb)closeLB()});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')document.querySelector('.prev').click();if(e.key==='ArrowRight')document.querySelector('.next').click()});

const nav=document.querySelector('.nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30));
document.querySelector('.menu').onclick=()=>{const n=document.querySelector('.nav nav');n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.top='65px';n.style.left='0';n.style.right='0';n.style.padding='25px 7vw';n.style.background='#11100f';n.style.flexDirection='column'};
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.nav nav').style.display='none'}));
document.getElementById('year').textContent=new Date().getFullYear();

const reel=document.getElementById('reel');
const reelSound=document.getElementById('reelSound');

if(reel && reelSound){

  reel.controls=false;
  reel.muted=false;
  reel.volume=1;

  const setButton=(playing)=>{
    reelSound.classList.toggle('playing',playing);
    reelSound.innerHTML=playing
      ? '<span>Ⅱ</span> REEL PLAYING · MUSIC ON'
      : '<span>▶</span> PLAY REEL + MUSIC';
  };

  const playReel=async()=>{
    try{
      reel.muted=false;
      reel.volume=1;
      await reel.play();
      setButton(true);
    }catch(error){
      console.log('Reel playback error:',error);
      setButton(false);
      reelSound.innerHTML='<span>▶</span> TAP TO PLAY REEL + MUSIC';
    }
  };

  reelSound.addEventListener('click',()=>{
    if(reel.paused){
      playReel();
    }else{
      reel.pause();
      setButton(false);
    }
  });

  reel.addEventListener('click',()=>{
    if(reel.paused){
      playReel();
    }else{
      reel.pause();
      setButton(false);
    }
  });

  reel.addEventListener('ended',()=>{
    reel.currentTime=0;
    setButton(false);
  });

  reel.addEventListener('pause',()=>{
    if(!reel.ended){
      setButton(false);
    }
  });
}
