/* Navegação compacta inspirada no APP Faculdade: quatro abas fixas e seções internas. */
(function(){
'use strict';
const groups=[
{label:'Shorts',icon:'🎬',items:['Shorts']},
{label:'Matérias',icon:'📚',items:['Matérias','Questões','Simulados','Curso ENEM','Habilidades','Provas 2024','Gabaritos oficiais','Área: Linguagens','Área: Humanas','Área: Natureza','Área: Matemática']},
{label:'Leitura',icon:'📖',items:['Leitura','Leitura - Linguagens','Leitura - Humanas','Leitura - Natureza','Leitura - Matemática','Leitura - Redação']},
{label:'Mais',icon:'☰',items:['Mais','Desempenho','Estatísticas','Discursivas','Redação','Plano','Dados']}
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
else if(tab==='Leitura'){document.querySelector('#app').innerHTML=hub('Leitura por matéria','Escolha uma das quatro áreas do ENEM ou estude redação.',[['Leitura - Linguagens','📚','Linguagens, Códigos e suas Tecnologias'],['Leitura - Humanas','🌎','Ciências Humanas e suas Tecnologias'],['Leitura - Natureza','🔬','Ciências da Natureza e suas Tecnologias'],['Leitura - Matemática','📐','Matemática e suas Tecnologias'],['Leitura - Redação','✍️','Três aulas completas de redação']]);}
else if(tab.startsWith('Leitura - ')){const names={'Leitura - Linguagens':'Linguagens, Códigos e suas Tecnologias','Leitura - Humanas':'Ciências Humanas e suas Tecnologias','Leitura - Natureza':'Ciências da Natureza e suas Tecnologias','Leitura - Matemática':'Matemática e suas Tecnologias'};document.querySelector('#app').innerHTML='<section class="panel"><button type="button" onclick="go(\'Leitura\')">← Todas as matérias</button></section>'+(names[tab]?'<section class="panel"><h2>'+names[tab]+'</h2></section>':'');}
else if(tab==='Mais'){document.querySelector('#app').innerHTML=hub('Mais','Acesse seu desempenho, a redação e as configurações do aplicativo.',[['Desempenho','📊','Estatísticas e evolução dos estudos'],['Redação','✍️','Treino de redação'],['Plano','📅','Planejamento de estudos'],['Dados','💾','Dados e configurações']])+'<section class="panel"><h3>Aplicativo</h3><button type="button" id="enemInstallInMore" onclick="enemInstall()">⬇ Instalar aplicativo</button></section>';}
else if(tab==='Discursivas'){tab='Redação';originalRender();}
else originalRender();
bottomNav();
};
})();
