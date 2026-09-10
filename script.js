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
const descriptions={Weddings:'Stories of celebration, emotion and connection.',Couples:'Real people. Real emotions.',Portraits:'People, personality and expression.',Traditional:'Culture, rituals and beautiful traditions.', 'Baby & Family':'Little moments, lifelong memories.','Pre-Wedding':'Romantic stories before the big day.','Events':'Music, people and special moments.',Fashion:'Style, confidence and expression.'};
const categoryFor=i=>Object.keys(categories).find(k=>categories[k].includes(i))||'Other';
const catGrid=document.getElementById('catGrid');
const galleryTitle=document.getElementById('galleryTitle');
Object.entries(categories).forEach(([name,arr])=>{const el=document.createElement('article');el.className='cat';el.dataset.filter=name;el.innerHTML=`<img src="${imgs[arr[0]]}" alt="${name} photography"><div class="cat-copy"><b>${name.toUpperCase()}</b><p>${descriptions[name]}</p></div>`;el.onclick=()=>{const btn=document.querySelector('.filter[data-filter="'+name+'"]');if(btn)btn.click();document.getElementById('gallery').scrollIntoView({behavior:'smooth',block:'start'});};catGrid.appendChild(el)});
const filters=document.getElementById('filters');['All',...Object.keys(categories)].forEach((name,i)=>{const b=document.createElement('button');b.className='filter'+(i===0?' active':'');b.textContent=name;b.dataset.filter=name;filters.appendChild(b)});
const masonry=document.getElementById('masonry');let current='All', list=[];
function render(){masonry.innerHTML='';list=[];imgs.forEach((src,i)=>{const cat=categoryFor(i);if(current!=='All'&&cat!==current)return;list.push(i);const f=document.createElement('figure');f.innerHTML=`<img loading="lazy" src="${src}" alt="${cat} photograph by PHOTO HUB"><span class="tag">${cat.toUpperCase()}</span>`;f.onclick=()=>openLightbox(i);masonry.appendChild(f)})}
filters.addEventListener('click',e=>{if(!e.target.matches('.filter'))return;document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));e.target.classList.add('active');current=e.target.dataset.filter;render();if(galleryTitle){galleryTitle.innerHTML=current==='All'?'Real moments.<br><em>Real people.</em>':current+'<br><em>Beautifully remembered.</em>';}});render();
const lb=document.getElementById('lightbox'), lbImg=document.getElementById('lightboxImg'), lbCap=document.getElementById('lbCaption');let active=0;
function openLightbox(i){active=i;lb.classList.add('open');lb.setAttribute('aria-hidden','false');updateLB();document.body.style.overflow='hidden'}function updateLB(){lbImg.src=imgs[active];lbImg.alt=categoryFor(active)+' photograph by PHOTO HUB';lbCap.textContent=categoryFor(active).toUpperCase()+' · '+String(active+1).padStart(2,'0')}function closeLB(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow=''}document.querySelector('.close').onclick=closeLB;document.querySelector('.prev').onclick=()=>{active=(active+44)%45;updateLB()};document.querySelector('.next').onclick=()=>{active=(active+1)%45;updateLB()};lb.addEventListener('click',e=>{if(e.target===lb)closeLB()});document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')document.querySelector('.prev').click();if(e.key==='ArrowRight')document.querySelector('.next').click()});
const nav=document.querySelector('.nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30));document.querySelector('.menu').onclick=()=>{const n=document.querySelector('.nav nav');n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.top='65px';n.style.left='0';n.style.right='0';n.style.padding='25px 7vw';n.style.background='#11100f';n.style.flexDirection='column'};document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>{if(window.innerWidth<=900)document.querySelector('.nav nav').style.display='none'}));document.getElementById('year').textContent=new Date().getFullYear();

const reel=document.getElementById('reel'), reelSound=document.getElementById('reelSound');
if(reel&&reelSound){reelSound.addEventListener('click',async()=>{reel.muted=false;reel.volume=1;try{await reel.play();reelSound.classList.add('playing');reelSound.innerHTML='<span>Ⅱ</span> REEL PLAYING · MUSIC ON';}catch(e){reelSound.innerHTML='<span>▶</span> TAP TO PLAY WITH MUSIC';}});reel.addEventListener('play',()=>{if(!reel.muted){reelSound.classList.add('playing');reelSound.innerHTML='<span>Ⅱ</span> REEL PLAYING · MUSIC ON';}});reel.addEventListener('ended',()=>{reelSound.classList.remove('playing');reelSound.innerHTML='<span>↻</span> PLAY REEL + MUSIC';});}
