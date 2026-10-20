/* Navegação compacta inspirada no APP Faculdade: quatro abas fixas e seções internas. */
(function(){
'use strict';
const groups=[
{label:'Shorts',icon:'🎬',items:['Shorts']},
{label:'Matérias',icon:'📚',items:['Matérias','Questões','Simulados','Leitura','Curso ENEM','Habilidades','Provas 2024','Gabaritos oficiais']},
{label:'Desempenho',icon:'📊',items:['Estatísticas']},
{label:'Mais',icon:'☰',items:['Mais','Redação','Discursivas','Plano','Dados']}
];
const originalRender=render;
function category(t){return groups.find(g=>g.items.includes(t))?.label||'Mais'}
function sectionButton(t,emoji,desc){return '<button class="enem-section" type="button" onclick="go(\''+t+'\')"><span class="enem-section-icon">'+emoji+'</span><span><strong>'+t+'</strong><small>'+desc+'</small></span><span aria-hidden="true">›</span></button>'}
function hub(title,subtitle,items){return '<section class="panel"><h2>'+title+'</h2><p>'+subtitle+'</p><div class="enem-section-list">'+items.map(a=>sectionButton(...a)).join('')+'</div></section>'}
function bottomNav(){const selected=category(tab);document.querySelector('#nav').innerHTML=groups.map(g=>'<button type="button" class="'+(selected===g.label?'active':'')+'" onclick="go(\''+g.label+'\')" aria-label="'+g.label+'" aria-current="'+(selected===g.label?'page':'false')+'"><span class="enem-nav-icon">'+g.icon+'</span><span>'+g.label+'</span></button>').join('')}
render=function(){
if(tab==='Desempenho')tab='Estatísticas';
if(tab==='Matérias'){document.querySelector('#app').innerHTML=hub('Matérias e exercícios','Escolha o conteúdo ou a modalidade de estudo.',[['Questões','❓','Questões objetivas'],['Simulados','📝','Simulados de treino'],['Leitura','📖','Leitura e marcações'],['Curso ENEM','🎓','Resumos e conteúdo do Inep'],['Habilidades','🧠','Competências e habilidades'],['Provas 2024','📄','Cadernos de provas'],['Gabaritos oficiais','✔️','Consulta de respostas']]);}
else if(tab==='Mais'){document.querySelector('#app').innerHTML=hub('Mais opções','Redação, organização e ferramentas.',[['Redação','✍️','Treino de redação'],['Discursivas','🖊️','Respostas abertas'],['Plano','📅','Planejamento de estudos'],['Dados','💾','Backup, importação e instalação']]);}
else originalRender();
bottomNav();
};
})();
