/* Histórico de redações em Desempenho, preservando as duas fontes locais. */
(function(){
'use strict';
const KEY='enem-100-temas-redacao-respostas-v1';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function entries(){
 let drafts={};try{drafts=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}
 const themes=Array.isArray(window.enem100Data)?window.enem100Data:[];
 const result=Object.entries(drafts).filter(([id,t])=>typeof t==='string'&&t.trim()).map(([id,t])=>({title:themes[Number(id)]?.title||'Tema '+(Number(id)+1),text:t,origin:'Discursivas · Tema '+(Number(id)+1)}));
 try{if(typeof state!=='undefined'&&Array.isArray(state.essays))state.essays.forEach((e,i)=>{if(e&&typeof e.text==='string'&&e.text.trim())result.push({title:e.theme||'Redação',text:e.text,origin:'Treino anterior',date:e.date})})}catch(e){}
 return result;
}
function printEssay(index){
 const item=entries()[index];if(!item)return;
 const w=window.open('','_blank');if(!w){alert('Permita janelas pop-up para imprimir a redação.');return}
 const html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>'+escape(item.title)+'</title><style>body{font:12pt/1.65 Georgia,serif;color:#111;max-width:780px;margin:30px auto;padding:0 22px}h1{font: bold 18pt Arial,sans-serif;margin-bottom:10px}.meta{font:10pt Arial,sans-serif;color:#555;border-bottom:1px solid #bbb;padding-bottom:14px;margin-bottom:24px}.essay{white-space:pre-wrap;overflow-wrap:anywhere}@media print{@page{size:A4;margin:20mm}body{margin:0;padding:0;max-width:none}button{display:none}}</style></head><body><h1>'+escape(item.title)+'</h1><div class="meta">'+escape(item.origin)+'</div><div class="essay">'+escape(item.text)+'</div><script>window.onload=function(){window.print()}<\/script></body></html>';
 w.document.open();w.document.write(html);w.document.close();
}
window.enemPrintEssay=printEssay;
function show(){
 const app=document.getElementById('app');if(!app)return;
 const list=entries();
 const section=document.createElement('section');section.className='panel';section.id='enemEssaysPerformance';
 section.innerHTML='<h2>✍️ Redações salvas</h2><p><strong>'+list.length+' redação(ões)</strong> registradas neste dispositivo. Você pode consultar o texto completo aqui.</p>'+(list.length?list.map((e,i)=>'<details style="border:1px solid #45698b;border-radius:12px;padding:12px;margin:12px 0"><summary style="cursor:pointer"><strong>'+escape(e.title)+'</strong><small style="display:block">'+escape(e.origin)+(e.date?' · '+escape(new Date(e.date).toLocaleDateString('pt-BR')):'')+'</small></summary><p style="white-space:pre-wrap;line-height:1.65;overflow-wrap:anywhere">'+escape(e.text)+'</p><button type="button" onclick="enemPrintEssay('+i+')" style="margin-top:12px">🖨️ Imprimir redação</button></details>').join(''):'<p>Nenhuma redação salva ainda. Acesse Mais → Discursivas para escrever e salvar.</p>');
 app.appendChild(section);
}
const old=render;
render=function(){old();if(tab==='Estatísticas'||tab==='Desempenho')show()};
window.enemRedacoesDesempenho=show;
})();
