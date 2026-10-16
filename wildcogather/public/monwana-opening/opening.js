
(()=>{
const root=document.getElementById('monwana-journey'),q=s=>root.querySelector(s),world=JSON.parse(q('.world-data').textContent),countries=topojson.feature(world,world.objects.countries),land=topojson.feature(world,world.objects.land),target=[31.16930,-24.44684];let timers=[],raf=0,clock=0,lastTick=0,paused=false,pausedAnimations=[];let mapStarted=0;let playing=false;let width=736,height=600;
const photos=JSON.parse(q('.photos-data').textContent);root.querySelectorAll('[data-photo]').forEach(im=>im.src=photos[Number(im.dataset.photo)]);root.style.setProperty('--photo2','url("'+photos[2]+'")');
const canvas=q('.world'),ctx=canvas.getContext('2d');const mini=q('.mini-globe'),mc=mini.getContext('2d');const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const quote=q('.james-quote'),words=quote.textContent.split(' ');quote.textContent='';words.forEach((word,index)=>{const span=document.createElement('span');span.textContent=word;span.style.setProperty('--word-delay',`${index*.28}s`);quote.append(span,document.createTextNode(' '));});
function closing(){root.classList.add('outro-stage');q('.closing').setAttribute('aria-hidden','false');q('.lodge-page').setAttribute('inert','');stage(3,'A note from James Wild.');schedule(()=>notifyParent('monwana:complete'),reduced?50:9000);}




function size(){const r=q('.cinema').getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);mini.width=340;mini.height=340;mc.setTransform(2,0,0,2,0,0);drawMini();if(!playing)drawWorld(0);drawContours();root.style.setProperty('--book-scale',Math.min(1,(width-42)/680).toFixed(3));}
function paint(context,projection,w,h){const path=d3.geoPath(projection,context);context.clearRect(0,0,w,h);context.beginPath();path({type:'Sphere'});context.fillStyle='#1f3931';context.fill();context.strokeStyle='#a98a57';context.lineWidth=.8;context.stroke();context.save();context.beginPath();path({type:'Sphere'});context.clip();context.beginPath();path(land);context.fillStyle='#a39b70';context.fill();context.beginPath();path(countries);context.strokeStyle='#485c42';context.lineWidth=.55;context.stroke();context.beginPath();path(d3.geoGraticule10());context.strokeStyle='#b5b08744';context.lineWidth=.6;context.stroke();context.restore();}
function drawMini(){const p=d3.geoOrthographic().rotate([-25,-3]).translate([85,85]).scale(75);paint(mc,p,170,170);}
function drawWorld(t){const rotateT=d3.easeCubicInOut(Math.min(t/5,1));const z=d3.easeCubicInOut(Math.max(0,Math.min((t-5)/10,1)));const scale=(Math.min(width,height)*.32)*Math.exp(z*Math.log(90));const cx=width*(.61-.11*z),cy=height*.50;const projection=d3.geoOrthographic().rotate([-10+( -target[0]+10)*rotateT,-6+(-target[1]+6)*rotateT]).translate([cx,cy]).scale(scale);paint(ctx,projection,width,height);const pt=projection(target);if(rotateT>.6&&pt){ctx.beginPath();ctx.arc(pt[0],pt[1],4,0,Math.PI*2);ctx.fillStyle='#efc58a';ctx.fill();ctx.beginPath();ctx.arc(pt[0],pt[1],12,0,Math.PI*2);ctx.strokeStyle='#efc58a88';ctx.lineWidth=1;ctx.stroke();}q('.map-readout').textContent=t<5?'AFRICA / SOUTH AFRICA':t<12?'SOUTH AFRICA / GREATER KRUGER':'THORNYBUSH / MONWANA';q('.map-caption').style.opacity=t>6?'0':'1';}
function drawContours(){const c=q('.contour-canvas');const r=q('.cinema').getBoundingClientRect();c.width=Math.round(r.width);c.height=Math.round(r.height);const x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);x.strokeStyle='#e4c796';x.lineWidth=.65;for(let i=0;i<17;i++){x.beginPath();for(let py=0;py<=c.height;py+=4){const px=i*c.width/13+Math.sin(py/78+i*.4)*23+Math.sin(py/39+i*.6)*8;py?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}}
function schedule(fn,ms){timers.push({fn,at:clock+ms});}
function setPaused(value){paused=value;q('#monwana-pause').textContent=value?'Resume':'Pause';if(value){pausedAnimations=root.getAnimations({subtree:true});pausedAnimations.forEach(a=>a.pause());}else{pausedAnimations.forEach(a=>a.play());pausedAnimations=[];}}
function clear(){timers=[];playing=false;setPaused(false);}
function tick(now){if(lastTick&&!paused)clock+=Math.min(now-lastTick,100);lastTick=now;if(!paused){const due=timers.filter(t=>t.at<=clock);timers=timers.filter(t=>t.at>clock);due.sort((a,b)=>a.at-b.at).forEach(t=>t.fn());if(playing)frame(clock);}raf=requestAnimationFrame(tick);}
raf=requestAnimationFrame(tick);
function stage(index,text){q('.scene-caption').textContent=text;root.querySelectorAll('.chapter-strip span').forEach((s,i)=>s.classList.toggle('active',index===i));}
function frame(now){const t=(now-mapStarted)/1000;drawWorld(reduced?15:Math.min(t*1.35,15));if(t>13)playing=false;}
function map(){root.classList.add('map-stage');q('.atlas').setAttribute('aria-hidden','false');stage(1,'A world of possibilities. One place that stays with you.');mapStarted=clock;playing=true;schedule(()=>{root.classList.add('local-stage');stage(2,'Thornybush. Greater Kruger. Monwana.');},reduced?100:10500);schedule(arrival,reduced?260:15500);schedule(()=>stay(true),reduced?420:22000);}
function arrival(){root.classList.add('arrival-stage');q('.photo-reveal').setAttribute('aria-hidden','false');stage(2,'The map becomes a memory.');}
function stay(withClosing=true){playing=false;root.classList.add('stay-stage');q('.lodge-page').setAttribute('aria-hidden','false');q('.lodge-page').removeAttribute('inert');q('.atlas').setAttribute('aria-hidden','true');q('.photo-reveal').setAttribute('aria-hidden','true');q('#monwana-play').textContent='Replay Monwana';stage(3,'Monwana. Your next chapter.');if(withClosing)schedule(closing,reduced?300:6500);}
function reset(){clear();q('.closing').setAttribute('aria-hidden','true');q('.lodge-page').setAttribute('inert','');root.className='resetting';void root.offsetWidth;root.classList.remove('resetting');q('.map-caption').style.opacity='1';['.atlas','.photo-reveal','.lodge-page'].forEach(s=>q(s).setAttribute('aria-hidden','true'));drawWorld(0);stage(0,'A place. A memory. A chapter.');}
q('#monwana-play').addEventListener('click',()=>{reset();q('#monwana-play').textContent='Replay opening';schedule(()=>root.classList.add('open'),reduced?40:200);schedule(()=>{root.classList.add('page-two');stage(0,'The moments between the adventures.');},reduced?100:8500);schedule(()=>{root.classList.add('page-three');stage(0,'Every chapter has its coordinates.');},reduced?180:16500);schedule(map,reduced?260:24500);});
q('#monwana-stay').addEventListener('click',()=>{reset();stay(false);notifyParent('monwana:skip');});
q('#monwana-quote').addEventListener('click',()=>{reset();stay(false);schedule(closing,reduced?40:100);});

q('#monwana-pause').addEventListener('click',()=>setPaused(!paused));
function notifyParent(type){if(window.parent!==window)window.parent.postMessage({type,source:'monwana-opening'},'*');}
root.querySelectorAll('.continue-page').forEach(b=>b.addEventListener('click',()=>{clear();notifyParent('monwana:continue');if(window.parent===window){reset();stay(false);}}));

let entered=false;const begin=async()=>{if(entered)return;entered=true;await document.fonts.ready;await Promise.all(Array.from(root.querySelectorAll('img')).map(im=>im.decode().catch(()=>{})));if(reduced){reset();stay(false);}else q('#monwana-play').click();};
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();begin();}},{threshold:.35});observer.observe(q('.cinema'));}else schedule(begin,350);
new ResizeObserver(size).observe(q('.cinema'));size();
new ResizeObserver(()=>{if(window.parent!==window)window.parent.postMessage({type:'monwana:height',source:'monwana-opening',height:document.documentElement.scrollHeight},'*');}).observe(document.body);
})();
