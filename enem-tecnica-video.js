(()=>{'use strict';
const files=Array.from({length:6},(_,i)=>'./videos/tecnica-estudos-'+String(i).padStart(2,'0')+'.mp4');
const key='enem-tecnica-estudos-pos-v1';
window.enemTecnicaVideoRender=()=>{
 const root=document.getElementById('app');if(!root)return;
 root.innerHTML='<section class="panel"><h2>🎥 Técnica de Estudos</h2><p>Assista na sequência ou escolha diretamente uma das seis partes.</p><video id="enemTecnicaPlayer" controls playsinline preload="metadata" style="display:block;width:100%;max-height:65vh;background:#000;border-radius:12px"></video><p id="enemTecnicaStatus" aria-live="polite"></p><div id="enemTecnicaControls" style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0"><button type="button" id="enemTecnicaPrev">◀ Anterior</button><button type="button" id="enemTecnicaNext">Próxima ▶</button><button type="button" id="enemTecnicaRestart">↺ Início</button></div><h3>Escolha a parte</h3><div id="enemTecnicaChapters" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px"></div><p><small>As partes passam automaticamente uma para a próxima. Sua posição é salva neste aparelho.</small></p></section>';
 const video=document.getElementById('enemTecnicaPlayer'),status=document.getElementById('enemTecnicaStatus'),chapters=document.getElementById('enemTecnicaChapters');
 let current=0,restoreTime=0,lastSave=0;
 try{const saved=JSON.parse(localStorage.getItem(key)||'{}');if(Number.isInteger(saved.part)&&saved.part>=0&&saved.part<6){current=saved.part;restoreTime=Number(saved.time)||0;}}catch{}
 const buttons=files.map((_,i)=>{const b=document.createElement('button');b.type='button';b.textContent='Parte '+(i+1);b.style.cssText='padding:12px 4px;min-width:0';b.onclick=()=>load(i,true,0);chapters.appendChild(b);return b;});
 function save(){try{localStorage.setItem(key,JSON.stringify({part:current,time:video.currentTime||0}));}catch{}}
 function load(i,auto,time=0){current=i;restoreTime=time;video.src=files[i];video.load();status.textContent='Reproduzindo a parte '+(i+1)+' de 6';buttons.forEach((b,j)=>{b.style.outline=j===i?'3px solid #8b5cf6':'';b.setAttribute('aria-pressed',String(j===i));});document.getElementById('enemTecnicaPrev').disabled=i===0;document.getElementById('enemTecnicaNext').disabled=i===5;save();if(auto){const onReady=()=>{video.removeEventListener('loadedmetadata',onReady);video.play().catch(()=>{status.textContent+=' · Toque em ▶ para continuar.'});};video.addEventListener('loadedmetadata',onReady,{once:true});}}
 video.addEventListener('loadedmetadata',()=>{if(restoreTime>0&&Number.isFinite(video.duration)&&restoreTime<video.duration){video.currentTime=restoreTime;}restoreTime=0;});
 video.addEventListener('timeupdate',()=>{if(Date.now()-lastSave>4000){lastSave=Date.now();save();}});
 video.addEventListener('pause',save);
 video.addEventListener('ended',()=>{if(current<5)load(current+1,true,0);else{status.textContent='✓ Vídeo concluído.';try{localStorage.removeItem(key)}catch{}}});
 video.addEventListener('error',()=>{status.textContent='Não foi possível carregar a parte '+(current+1)+'. Verifique sua conexão.';});
 document.getElementById('enemTecnicaPrev').onclick=()=>load(Math.max(0,current-1),true,0);
 document.getElementById('enemTecnicaNext').onclick=()=>load(Math.min(5,current+1),true,0);
 document.getElementById('enemTecnicaRestart').onclick=()=>load(0,true,0);
 load(current,false,restoreTime);
};
})();