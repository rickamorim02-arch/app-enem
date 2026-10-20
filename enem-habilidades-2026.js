(function(){
const topics=[
["Linguagens","H1–H4","Comunicação: analise emissor, destinatário, suporte e função social."],
["Linguagens","H5–H8","Língua estrangeira: identifique tema, contexto e função social."],
["Linguagens","H9–H14","Corpo e arte: relacione manifestações culturais a identidades e diversidade."],
["Linguagens","H15–H20","Literatura e gêneros: associe contexto histórico, organização e funções da linguagem."],
["Linguagens","H21–H24","Argumentação: identifique público-alvo, opinião e estratégias persuasivas."],
["Linguagens","H25–H30","Variação linguística e tecnologia: analise adequação de registro e impactos sociais."],
["Matemática","H1–H5","Números: interprete operações, padrões e razoabilidade."],
["Matemática","H6–H14","Geometria, escalas e medidas: desenhe e confira unidades."],
["Matemática","H15–H18","Proporcionalidade: distinga relações diretas e inversas."],
["Matemática","H19–H23","Álgebra: identifique variáveis e interprete gráficos cartesianos."],
["Matemática","H24–H26","Gráficos e tabelas: leia eixos, unidades e tendências."],
["Matemática","H27–H30","Estatística e probabilidade: defina dados, amostras e eventos."],
["Natureza","H1–H7","Ciência e tecnologias: associe fenômenos a aplicações e materiais."],
["Natureza","H8–H12","Ambiente: relacione ciclos, poluição e conservação."],
["Natureza","H13–H16","Biologia: interprete genética, processos vitais e evolução."],
["Natureza","H17–H19","Método científico: compare evidências, gráficos e experimentos."],
["Natureza","H20–H23","Física: interprete movimentos, energia e eletromagnetismo."],
["Natureza","H24–H30","Química: analise substâncias, transformações e impactos."],
["Humanas","H1–H5","Cultura e memória: compare fontes e identidades."],
["Humanas","H6–H10","Território: interprete mapas e relações de poder."],
["Humanas","H11–H15","Movimentos sociais: analise participação e instituições."],
["Humanas","H16–H20","Trabalho: relacione tecnologias e processos produtivos."],
["Humanas","H21–H25","Cidadania: examine direitos, democracia e conflitos."],
["Humanas","H26–H30","Ambiente: relacione espaço geográfico e impactos sociais."]
];
const sources=[["2025","https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2025"],["2024","https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2024"],["2023","https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2023"]];
const KEY="enem-habilidades-2026";let done=[];try{done=JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){}
const escape=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
function view(){return '<section class="panel"><h2>Habilidades ENEM 2026</h2><p>24 resumos pedagógicos de grupos de habilidades, baseados nas Matrizes de Referência do Inep 2026. Não são transcrições oficiais.</p><p>'+done.length+' de '+topics.length+' revisados</p><div class="progress"><div style="width:'+Math.round(done.length/topics.length*100)+'%"></div></div></section>'+topics.map((t,i)=>'<details class="panel"><summary><b>'+escape(t[0])+' '+escape(t[1])+'</b> '+(done.includes(i)?"✓":"")+'</summary><p>'+escape(t[2])+'</p><button onclick="enemMarkSkill('+i+')">'+(done.includes(i)?"Desmarcar":"Concluir revisão")+'</button></details>').join('')+'<section class="panel"><h2>Provas anteriores oficiais</h2><p>Links para os cadernos e gabaritos do Inep. A importação e a conferência individual das questões ainda estão pendentes.</p>'+sources.map(s=>'<p><a target="_blank" rel="noopener noreferrer" href="'+s[1]+'">ENEM '+s[0]+' — provas e gabaritos</a></p>').join('')+'</section>'}
window.enemMarkSkill=i=>{done=done.includes(i)?done.filter(n=>n!==i):[...done,i];localStorage.setItem(KEY,JSON.stringify(done));render()};
const prev=render;tabs.push("Habilidades");render=function(){if(tab!=="Habilidades")return prev();document.querySelector("#nav").innerHTML=tabs.map(t=>'<button class="'+(t===tab?"active":"")+'" onclick="go(&quot;'+t+'&quot;)">'+t+'</button>').join("");document.querySelector("#app").innerHTML=view();mascot()};
})();