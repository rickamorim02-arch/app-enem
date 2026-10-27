/* Biblioteca nativa dos quatro PDFs MEC/INEP. */
(()=>{'use strict';
const docs=[
['📐','Matemática','Matemática e suas Tecnologias.pdf',244],
['📖','Linguagens','Linguagens, Códigos e suas Tecnologias.pdf',171],
['🌎','Ciências Humanas','Ciências Humanas e suas Tecnologias.pdf',204],
['🔬','Ciências da Natureza','Ciências da Natureza e suas Tecnologias.pdf',299]
];
window.enemInepRender=()=>{
const root=document.getElementById('app');if(!root)return;
root.innerHTML='<section class="panel"><h2>📄 Materiais INEP</h2><p>Livros originais do estudante — ENCCEJA, MEC/INEP (2006). Os quatro PDFs já estão incluídos no aplicativo: não é necessário selecionar ou importar arquivos.</p><div id="enemInepList"></div><p><small>Para leitura sem internet, utilize “Preparar para usar sem internet” em Mais, enquanto estiver conectado. Os quatro PDFs somam aproximadamente 26,6 MB.</small></p></section>';
const list=document.getElementById('enemInepList');
docs.forEach(([icon,area,name,pages])=>{
const url='./materiais-inep/'+encodeURIComponent(name);
const item=document.createElement('div');item.className='panel';item.style.margin='10px 0';
const title=document.createElement('h3');title.textContent=icon+' '+area;
const detail=document.createElement('p');detail.textContent=name+' · '+pages+' páginas';
const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener';link.textContent='📖 Abrir PDF original';link.className='primary';link.style.cssText='display:inline-block;padding:12px;border-radius:9px;text-decoration:none';
item.append(title,detail,link);list.append(item);
});
};
})();