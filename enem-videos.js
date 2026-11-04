/* Biblioteca das 39 videoaulas ENEM. Não altera os registros da aba Leitura. */
(function(){'use strict';
const KEY='enem-video-39-ok-v1';
const areas=['Humanas','Natureza','Linguagens','Matemática'];
const redacao=['Entenda a proposta e planeje sua redação','Desenvolva seus argumentos','Construa a proposta de intervenção'];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function catalog(){const source=window.enemEnccejaLessons||[];const out=[];for(const area of areas){for(let n=1;n<=9;n++){const lesson=source.find(l=>l.area===area&&l.num===n);out.push({id:out.length+1,area,title:lesson?.title||'Aula '+n,number:n})}}redacao.forEach((title,i)=>out.push({id:out.length+1,area:'Redação',title,number:i+1}));return out}
function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return x&&typeof x==='object'?x:{}}catch{return {}}}
const areaFolder={'Humanas':'humanas','Linguagens':'linguagens','Natureza':'natureza','Matemática':'matematica','Redação':'redacao'};
function videoPaths(l){const folder=areaFolder[l.area],num=String(l.number).padStart(2,'0');if(l.area==='Humanas'&&l.number===1)return [0,1,2].map(n=>'./videos/humanas/humanas-aula-01-parte-'+String(n).padStart(2,'0')+'.mp4');if(l.area==='Linguagens'&&l.number===1)return [0,1,2].map(n=>'./videos/linguagens/Linguagens-aula-01-parte-'+String(n).padStart(2,'0')+'.mp4');return ['./videos/'+folder+'/aula-'+num+'.mp4']}
window.enemVideoToggle=function(id){const done=read();if(done[id])delete done[id];else done[id]=new Date().toISOString();try{localStorage.setItem(KEY,JSON.stringify(done));window.enemRenderVideoLibrary()}catch(e){alert('Não foi possível salvar a marcação neste aparelho.')}};
window.enemRenderVideoLibrary=function(){const root=document.getElementById('app');if(!root)return;const lessons=catalog(),done=read(),total=lessons.filter(l=>done[l.id]).length;
root.innerHTML='<section class="panel"><h2>🎥 Videoaulas ENEM</h2><p><strong>'+total+' de 39 vídeos concluídos</strong> · '+(39-total)+' pendentes</p><p>39 aulas · cerca de 6 minutos cada · duração total estimada: 3h54min.</p><p class="muted">Os vídeos serão disponibilizados conforme forem recebidos. O botão OK funciona independentemente da Leitura.</p><div id="enemVideoList"></div></section>';
const list=document.getElementById('enemVideoList');for(const area of [...areas,'Redação']){const heading=document.createElement('h3');heading.textContent=area;heading.style.marginTop='22px';list.append(heading);for(const l of lessons.filter(x=>x.area===area)){const ok=!!done[l.id];const card=document.createElement('div');card.style.cssText='border:1px solid #b6bdd0;border-radius:12px;padding:12px;margin:9px 0;background:'+(ok?'#e0f7e9':'#f5f6fb')+';color:#17263c';const row=document.createElement('div');row.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:8px';const title=document.createElement('div');title.style.cssText='flex:1;min-width:0';title.innerHTML='<strong style="color:#17263c">Vídeo '+String(l.id).padStart(2,'0')+' · Aula '+l.number+'</strong><div style="color:#27374e;overflow-wrap:anywhere">'+esc(l.title)+'</div><small style="color:#526076">≈ 6 min</small>';const button=document.createElement('button');button.type='button';button.textContent=ok?'✓ OK':'☐ OK';button.setAttribute('aria-label',(ok?'Desmarcar':'Marcar')+' vídeo '+l.id);button.style.cssText='min-width:72px;background:'+(ok?'#147d46':'#dcd8eb')+';color:'+(ok?'white':'#17263c');button.onclick=()=>window.enemVideoToggle(l.id);row.append(title,button);card.append(row);const slot=document.createElement('div');slot.style.cssText='margin-top:10px';slot.textContent='Aguardando envio do vídeo.';card.append(slot);list.append(card);
const published=(l.area==='Humanas'||l.area==='Linguagens')&&l.number===1;
if(!published){slot.textContent='Aguardando envio do vídeo.';continue}
slot.textContent='';const indicator=document.createElement('div');indicator.style.cssText='margin-bottom:8px;font-weight:600;color:#25344b';slot.append(indicator);
const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='metadata';video.style.cssText='display:block;width:100%;max-height:60vh;background:#000;border-radius:9px';slot.append(video);
const parts=videoPaths(l);let part=0;
function showPart(n,autoplay){part=n;indicator.textContent='Parte '+(n+1)+' de '+parts.length;video.src=parts[n];video.load();if(autoplay)video.play().catch(()=>{});}
video.addEventListener('ended',()=>{if(part+1<parts.length)showPart(part+1,true)});
video.addEventListener('error',()=>{indicator.textContent='Não foi possível carregar a parte '+(part+1)+'. Verifique a conexão ou abra o arquivo diretamente no GitHub.'});
showPart(0,false);
}}};
})();
