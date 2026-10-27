/* Navegação compacta inspirada no APP Faculdade: três abas fixas e seções internas. */
(function(){
'use strict';
const groups=[
{label:'Shorts',icon:'🎬',items:['Shorts']},
{label:'Leitura',icon:'📖',items:['Leitura','Leitura - Linguagens','Leitura - Humanas','Leitura - Natureza','Leitura - Matemática','Leitura - Redação']},
{label:'Vídeos',icon:'🎥',items:['Vídeos']},
{label:'Tarefas',icon:'☑️',items:['Tarefas']},
{label:"Materiais INEP",icon:'📄',items:["Materiais INEP"]},
{label:'Mais',icon:'☰',items:['Mais','Desempenho','Estatísticas','Discursivas','Gravações','Redação','Plano','Dados']}
];

const offlineFiles=['./','./index.html','./enem-app-core.js','./enem-gravador.js','./enem-tarefas.js','./enem-materiais-inep.js','./enem-cronometro.js','./enem-caneta-leitura.js','./enem-videos.js','./enem-inep-2026.js','./enem-habilidades-2026.js','./enem-gabaritos-2024.js','./enem-provas-2024.js','./mascot-3d.js','./enem-nav.js','./enem-aulas-redacao.js','./enem-100-temas.js','./enem-36-aulas-encceja.js','./enem-leitura-unificada.js','./enem-shorts-questoes.js','./enem-shorts-856-extra.js','./enem-redacoes-desempenho.js','./manifest.webmanifest','./icon.svg'];
const offlineCache='enem-offline-v78';
async function offlineCheck(){const el=document.getElementById('enemOfflineStatus');if(!el)return;if(!('caches'in window)){el.textContent='Navegador sem suporte a armazenamento offline.';return}try{const cache=await caches.open(offlineCache);const items=await Promise.all(offlineFiles.map(p=>cache.match(new URL(p,location.href))));const n=items.filter(Boolean).length;el.textContent=(navigator.onLine?'🟢 Com internet':'📴 Sem internet')+' · '+n+'/'+offlineFiles.length+' arquivos preparados'+(n===offlineFiles.length?' · Pronto para uso offline':'')}catch(e){el.textContent='Não foi possível verificar o armazenamento offline.'}}
window.enemPrepareOffline=async function(){const el=document.getElementById('enemOfflineStatus');if(!el)return;if(!navigator.onLine){el.textContent='Conecte-se à internet para preparar o modo offline.';return}try{const cache=await caches.open(offlineCache);let n=0;for(const p of offlineFiles){const url=new URL(p,location.href);const response=await fetch(url.href,{cache:'reload'});if(!response.ok)throw Error(p);await cache.put(url.href,response);el.textContent='Baixando arquivos: '+(++n)+'/'+offlineFiles.length}el.textContent='✅ Modo offline preparado: '+n+' arquivos disponíveis neste aparelho.'}catch(e){el.textContent='Falha ao baixar um arquivo ('+e.message+'). Tente novamente com internet.'}};
window.addEventListener('online',offlineCheck);window.addEventListener('offline',offlineCheck);
const originalRender=render;
function category(t){return groups.find(g=>g.items.includes(t))?.label||'Mais'}
function sectionButton(t,emoji,desc){return '<button class="enem-section" type="button" onclick="go(\''+t+'\')"><span class="enem-section-icon">'+emoji+'</span><span><strong>'+t+'</strong><small>'+desc+'</small></span><span aria-hidden="true">›</span></button>'}
function hub(title,subtitle,items){return '<section class="panel"><h2>'+title+'</h2><p>'+subtitle+'</p><div class="enem-section-list">'+items.map(a=>sectionButton(...a)).join('')+'</div></section>'}
function bottomNav(){const selected=category(tab);document.querySelector('#nav').innerHTML=groups.map(g=>'<button type="button" class="'+(selected===g.label?'active':'')+'" onclick="go(\''+g.label+'\')" aria-label="'+g.label+'" aria-current="'+(selected===g.label?'page':'false')+'"><span class="enem-nav-icon">'+g.icon+'</span><span>'+g.label+'</span></button>').join('')}
render=function(){
if(tab==='Desempenho')tab='Estatísticas';
if(tab==='Matérias'||tab.startsWith('Área: '))tab='Shorts';
if(tab==='Leitura'){document.querySelector('#app').innerHTML=hub('Leitura por matéria','Escolha uma das quatro áreas do ENEM ou estude redação.',[['Leitura - Linguagens','📚','Linguagens, Códigos e suas Tecnologias'],['Leitura - Humanas','🌎','Ciências Humanas e suas Tecnologias'],['Leitura - Natureza','🔬','Ciências da Natureza e suas Tecnologias'],['Leitura - Matemática','📐','Matemática e suas Tecnologias'],['Leitura - Redação','✍️','Três aulas completas de redação']]);}
else if(tab.startsWith('Leitura - ')){const names={'Leitura - Linguagens':'Linguagens, Códigos e suas Tecnologias','Leitura - Humanas':'Ciências Humanas e suas Tecnologias','Leitura - Natureza':'Ciências da Natureza e suas Tecnologias','Leitura - Matemática':'Matemática e suas Tecnologias'};document.querySelector('#app').innerHTML='<section class="panel"><button type="button" onclick="go(\'Leitura\')">← Todas as matérias</button></section>'+(names[tab]?'<section class="panel"><h2>'+names[tab]+'</h2></section>':'');}
else if(tab==='Tarefas'){window.enemRenderTasks?.();}
else if(tab==='Materiais INEP'){window.enemInepRender?.();}
else if(tab==='Vídeos'){document.querySelector('#app').innerHTML='<section class="panel"><h2>🎥 Vídeos</h2><p>Nenhum vídeo cadastrado.</p></section>';}
else if(tab==='Mais'){document.querySelector('#app').innerHTML=hub('Mais','Acompanhe seu desempenho e pratique discursivas.',[['Desempenho','📊','Estatísticas e evolução dos estudos'],['Discursivas','✍️','Escolher, sortear e responder um dos 100 temas'],['Gravações','🎙️','Ouvir e exportar áudios gravados']])+'<section class="panel"><h3>Aplicativo</h3><button type="button" id="enemInstallInMore" onclick="enemInstall()">⬇ Instalar aplicativo</button><div id="enemOfflinePanel" style="margin-top:18px"><h3>📴 Modo offline</h3><p id="enemOfflineStatus">Verificando arquivos disponíveis...</p><button type="button" onclick="enemPrepareOffline()">⬇ Preparar para usar sem internet</button><p><small>Prepare com internet. Depois, abra o aplicativo neste mesmo navegador mesmo sem conexão.</small></p></div></section>';}
else if(tab==='Gravações'){document.querySelector('#app').innerHTML='<section class="panel"><h2>🎙️ Gravações de voz</h2><p>Ouça, exporte ou exclua suas gravações salvas neste aparelho.</p><div id="enemRecordingsList">Carregando...</div></section>';window.enemShowRecordings?.();}
else if(tab==='Discursivas'){document.querySelector('#app').innerHTML='<section class="panel"><button type="button" onclick="go(\'Mais\')">← Mais</button></section>';}
else originalRender();
bottomNav();
if(tab==='Mais')offlineCheck();
};
})();
