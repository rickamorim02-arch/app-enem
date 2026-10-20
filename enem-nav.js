/* Navegação compacta inspirada no APP Faculdade: quatro abas fixas e seções internas. */
(function(){
'use strict';
const groups=[
{label:'Shorts',icon:'🎬',items:['Shorts']},
{label:'Matérias',icon:'📚',items:['Matérias','Questões','Simulados','Curso ENEM','Habilidades','Provas 2024','Gabaritos oficiais','Área: Linguagens','Área: Humanas','Área: Natureza','Área: Matemática']},
{label:'Leitura',icon:'📖',items:['Leitura']},
{label:'Desempenho',icon:'📊',items:['Estatísticas']},
{label:'Discursivas',icon:'✍️',items:['Mais','Redação','Discursivas','Plano','Dados']}
];
const originalRender=render;
function category(t){return groups.find(g=>g.items.includes(t))?.label||'Mais'}
function sectionButton(t,emoji,desc){return '<button class="enem-section" type="button" onclick="go(\''+t+'\')"><span class="enem-section-icon">'+emoji+'</span><span><strong>'+t+'</strong><small>'+desc+'</small></span><span aria-hidden="true">›</span></button>'}
function hub(title,subtitle,items){return '<section class="panel"><h2>'+title+'</h2><p>'+subtitle+'</p><div class="enem-section-list">'+items.map(a=>sectionButton(...a)).join('')+'</div></section>'}
function bottomNav(){const selected=category(tab);document.querySelector('#nav').innerHTML=groups.map(g=>'<button type="button" class="'+(selected===g.label?'active':'')+'" onclick="go(\''+g.label+'\')" aria-label="'+g.label+'" aria-current="'+(selected===g.label?'page':'false')+'"><span class="enem-nav-icon">'+g.icon+'</span><span>'+g.label+'</span></button>').join('')}
render=function(){
if(tab==='Desempenho')tab='Estatísticas';
if(tab==='Matérias'){document.querySelector('#app').innerHTML=hub('As quatro áreas do ENEM','Selecione uma área do conhecimento para estudar e responder questões.',[['Área: Linguagens','📖','Linguagens, Códigos e suas Tecnologias'],['Área: Humanas','🌎','Ciências Humanas e suas Tecnologias'],['Área: Natureza','🔬','Ciências da Natureza e suas Tecnologias'],['Área: Matemática','📐','Matemática e suas Tecnologias']]);}
else if(tab.startsWith('Área: ')){const areaMap={'Área: Linguagens':0,'Área: Matemática':1,'Área: Humanas':2,'Área: Natureza':3};const idx=areaMap[tab];if(idx===undefined){tab='Matérias';render();return}const current=tab;tab='Questões';originalRender();tab=current;const select=document.querySelector('#area');if(select){select.value=String(idx);questionIndex=0;showQuestion()}}
else if(tab==='Mais'){tab='Discursivas';document.querySelector('#app').innerHTML='';}
else if(tab==='Discursivas'){document.querySelector('#app').innerHTML='';}
else originalRender();
bottomNav();
};
})();
