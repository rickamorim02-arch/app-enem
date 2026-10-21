/* Banco adicional autoral: 856 itens determinísticos, 214 por área. Sem IA externa. */
(function(){
'use strict';
const result=[], areas=['Matemática','Natureza','Linguagens','Humanas'];
const money=n=>'R$ '+n.toFixed(2).replace('.',',');
function add(area,n,stem,correct,wrong,why,level){
const opts=[String(correct),...wrong.map(String)];
if(new Set(opts).size!==4)throw Error('Alternativas repetidas: '+stem);
const shift=(n*7+areas.indexOf(area))%4;
const rotated=opts.slice(shift).concat(opts.slice(0,shift));
result.push({area,num:(n%9)+1,q:stem,opts:rotated,right:rotated.indexOf(String(correct)),why,level});
}
const languages=[
['concessão','Embora estivesse chovendo, saímos.','Embora','concessão','causa','condição','finalidade'],
['causa','Como estava chovendo, ficamos em casa.','Como','causa','comparação','adição','conclusão'],
['condição','Se houver tempo, revisaremos o texto.','Se','condição','oposição','causa','explicação'],
['conclusão','Estudou bastante; portanto, progrediu.','portanto','conclusão','tempo','concessão','alternância'],
['oposição','Queria sair, mas estava cansado.','mas','oposição','adição','finalidade','condição'],
['finalidade','Estudou para que pudesse ingressar na universidade.','para que','finalidade','conclusão','causa','concessão'],
['tempo','Quando o sinal tocou, a aula terminou.','Quando','tempo','oposição','condição','conclusão'],
['adição','Ela leu o livro e escreveu um resumo.','e','adição','concessão','causa','comparação'],
['explicação','Leve o casaco, pois esfriou.','pois','explicação','alternância','condição','concessão'],
['alternância','Ou revisamos agora, ou deixamos para amanhã.','Ou...ou','alternância','causa','finalidade','conclusão']
];
const humanThemes=[
['industrialização','crescimento da produção mecanizada','fim da divisão do trabalho','eliminação imediata das desigualdades','retorno obrigatório ao feudalismo','A industrialização envolve máquinas, fábricas e novas formas de organização produtiva.'],
['urbanização','aumento da população que vive em cidades','redução necessária de todos os problemas urbanos','extinção das áreas rurais','fim automático do desemprego','Urbanização é o crescimento relativo ou absoluto da população urbana.'],
['cidadania','participação na vida pública e exercício de direitos','proibição de participação política','ausência de deveres coletivos','exclusão de grupos sociais','Cidadania envolve direitos, deveres e participação nas decisões coletivas.'],
['migração','deslocamento de pessoas entre territórios','movimento exclusivo de mercadorias','crescimento natural sem deslocamentos','mudança obrigatória do clima','Migração é o deslocamento populacional, interno ou internacional.'],
['democracia','participação política e mecanismos de representação','concentração vitalícia de poder sem controle','supressão de eleições e debate','eliminação de direitos fundamentais','A democracia requer participação, pluralismo e mecanismos de controle.'],
['segregação socioespacial','distribuição desigual de grupos e infraestrutura no espaço urbano','igualdade automática entre bairros','ausência de diferenças de renda','fim das periferias','A segregação reflete desigualdades na ocupação e no acesso à cidade.'],
['globalização','intensificação dos fluxos internacionais de bens, capitais e informação','isolamento total das economias','fim das redes de comunicação','uniformidade econômica obrigatória','Globalização amplia conexões, mas não elimina assimetrias.'],
['território','espaço apropriado e marcado por relações de poder','local sem relações sociais','sinônimo exclusivo de altitude','área definida apenas por temperatura','Território envolve apropriação, controle e relações de poder.'],
['patrimônio cultural','bens e práticas que expressam memórias e identidades coletivas','somente mercadorias importadas','exclusivamente recursos minerais','qualquer objeto sem valor social','Patrimônio cultural inclui bens materiais e manifestações imateriais.'],
['sustentabilidade','uso de recursos considerando necessidades presentes e futuras','consumo ilimitado de recursos finitos','abandono obrigatório de toda tecnologia','descarte de resíduos sem tratamento','Sustentabilidade articula dimensões ambientais, sociais e econômicas.']
];
for(const area of areas){
for(let i=0;i<214;i++){
const n=i+1,kind=i%10,k=Math.floor(i/10),level=1+(i%3);
if(area==='Matemática'){
const a=20+k*7+(i%5),b=2+(i%7);
switch(kind){
case 0:{const p=5*(2+(k%7)),v=20*(k+2),ans=v*(100+p)/100;add(area,i,`Um produto custa ${money(v)} e sofre aumento de ${p}%. Qual o preço final?`,money(ans),[money(v),money(ans+p),money(v*(100-p)/100)],`O aumento é ${p}% de ${money(v)}; preço final = ${money(ans)}.`,level);break}
case 1:{const x=3+k,coef=2+(k%5),c=5+(k%9),total=coef*x+c;add(area,i,`Resolva ${coef}x + ${c} = ${total}.`,x,[x+1,x+2,x-1],`Subtraindo ${c} e dividindo por ${coef}, obtemos x = ${x}.`,level);break}
case 2:{const base=6+k,height=4+(k%11),ans=base*height/2;add(area,i,`Um triângulo tem base ${base} cm e altura ${height} cm. Qual é sua área?`,ans+' cm²',[(base*height)+' cm²',(base+height)+' cm²',(ans+base)+' cm²'],`Área = base × altura ÷ 2 = ${ans} cm².`,level);break}
case 3:{const count=4+(k%6),price=7+k,ans=count*price;add(area,i,`Cada caderno custa ${money(price)}. Quanto custam ${count} cadernos?`,money(ans),[money(ans+price),money(price),money(ans-price)],`Multiplique ${count} por ${money(price)}.`,level);break}
case 4:{const start=10+k,step=2+(k%5),ans=start+4*step;add(area,i,`Na PA ${start}, ${start+step}, ${start+2*step}, ... qual é o quinto termo?`,ans,[ans-step,ans+step,start+5*step],`a₅ = a₁ + 4r = ${ans}.`,level);break}
case 5:{const v=120+10*k,t=2+(k%5),ans=v/t;add(area,i,`Um veículo percorre ${v} km em ${t} horas. Qual sua velocidade média?`,ans+' km/h',[(ans+10)+' km/h',(ans*2)+' km/h',(ans-5)+' km/h'],`Velocidade média = distância ÷ tempo = ${ans} km/h.`,level);break}
case 6:{const red=2+(k%6),blue=3+(k%5),den=red+blue;add(area,i,`Uma urna contém ${red} bolas vermelhas e ${blue} azuis. Qual a probabilidade de retirar uma vermelha?`,red+'/'+den,[blue+'/'+den,red+'/'+(den+1),'1/'+den],`Casos favoráveis: ${red}; casos possíveis: ${den}.`,level);break}
case 7:{const l=3+k,w=2+(k%8),ans=2*(l+w);add(area,i,`Um terreno retangular mede ${l} m por ${w} m. Qual seu perímetro?`,ans+' m',[(l*w)+' m',(l+w)+' m',(ans+2)+' m'],`Perímetro = 2(${l}+${w}) = ${ans} m.`,level);break}
case 8:{const x=2+k,ans=x*x;add(area,i,`Qual o valor de ${x}²?`,ans,[ans+x,2*x,ans-1],`Elevar ao quadrado é multiplicar ${x} por ele mesmo.`,level);break}
case 9:{const n1=4+k,n2=8+k,n3=12+k,ans=8+k;add(area,i,`Qual é a média aritmética de ${n1}, ${n2} e ${n3}?`,ans,[ans+2,ans-2,n3],`A soma dos três valores dividida por 3 é ${ans}.`,level);break}
}
}else if(area==='Natureza'){
const mass=2+k,acc=2+(k%7),volt=12+4*k,res=2+(k%6);
switch(kind){
case 0:{const f=mass*acc;add(area,i,`Uma força acelera um corpo de ${mass} kg a ${acc} m/s². Qual é a força resultante?`,f+' N',[(mass+acc)+' N',(f+mass)+' N',(f-acc)+' N'],`Pela segunda lei de Newton, F = m × a = ${f} N.`,level);break}
case 1:{const current=3+k,voltage=current*res;add(area,i,`Um resistor de ${res} Ω está sob tensão de ${voltage} V. Qual a corrente?`,current+' A',[(current+res)+' A',(voltage+res)+' A',(current*res)+' A'],`Lei de Ohm: I = V/R = ${current} A.`,level);break}
case 2:{const volume=2+k,concentration=3+(k%8),massSolute=volume*concentration;add(area,i,`Uma solução tem concentração de ${concentration} g/L. Quantos gramas de soluto há em ${volume} L?`,massSolute+' g',[(massSolute+volume)+' g',concentration+' g',(massSolute-concentration)+' g'],`Massa = concentração × volume = ${massSolute} g.`,level);break}
case 3:{const start=18+k,end=start+5+(k%5),delta=end-start;add(area,i,`Uma amostra aquece de ${start} °C para ${end} °C. Qual a variação de temperatura?`,delta+' °C',[(start+end)+' °C',start+' °C',end+' °C'],`ΔT = Tfinal − Tinicial = ${delta} °C.`,level);break}
case 4:{const pop=100+10*k,rate=2+(k%6),growth=pop*rate/100;add(area,i,`Uma população de bactérias tem ${pop} indivíduos e cresce ${rate}% em uma hora. Quantos indivíduos são acrescentados?`,growth,[growth+rate,pop+growth,pop-rate],`Crescimento = ${pop} × ${rate}/100 = ${growth}.`,level);break}
case 5:{const t=2+k,p=5+(k%9),energy=t*p;add(area,i,`Um aparelho de potência ${p} W funciona durante ${t} segundos. Qual energia consome?`,energy+' J',[(energy+p)+' J',(energy-t)+' J',p+' J'],`E = P × t = ${energy} joules.`,level);break}
case 6:{const d=100+20*k,t=2+(k%6),speed=d/t;add(area,i,`Um móvel percorre ${d} metros em ${t} segundos. Qual sua velocidade média?`,speed+' m/s',[(speed+t)+' m/s',(speed*2)+' m/s',(speed-1)+' m/s'],`v = distância/tempo = ${speed} m/s.`,level);break}
case 7:{const protons=6+k,neutrons=6+(k%11),a=protons+neutrons;add(area,i,`Um átomo possui ${protons} prótons e ${neutrons} nêutrons. Qual é seu número de massa?`,a,[protons,neutrons,a+1],`Número de massa = prótons + nêutrons = ${a}.`,level);break}
case 8:{const a=2+k,b=3+(k%8),total=a+b;add(area,i,`Uma cadeia alimentar registra ${a} produtores e ${b} consumidores em uma amostra. Quantos organismos foram registrados?`,total,[total+1,a*b,total+2],`Somam-se os dois grupos: ${a} + ${b} = ${total}.`,level);break}
case 9:{const initial=100+5*k,loss=10+(k%9),remain=initial-loss;add(area,i,`Um reservatório tinha ${initial} L de água e perdeu ${loss} L por evaporação. Qual o volume restante?`,remain+' L',[(initial+loss)+' L',loss+' L',(remain+loss/2)+' L'],`Balanço de matéria: volume final = inicial − perda = ${remain} L.`,level);break}
}
}else if(area==='Linguagens'){
const row=languages[k%languages.length],phrase=row[1],term=row[2],right=row[3];
const context=['Em um exercício de leitura','Ao analisar a coesão do período','Numa questão de interpretação','Em uma revisão de texto','Na análise do conectivo','Durante uma atividade de linguagem','Ao identificar relações semânticas','Em uma prova de leitura','Na interpretação de uma oração','Em uma aula de gramática','Ao examinar a estrutura textual'];
const pre=context[Math.floor(k/languages.length)%context.length];
add(area,i,`${pre}, considere: “${phrase}” A expressão “${term}” estabelece qual relação de sentido?`,right,[row[4],row[5],row[6]],`O conectivo “${term}” indica ${right} no contexto apresentado.`,level);
}else{
if(kind<6){const theme=humanThemes[(k+kind)%humanThemes.length];const context=['Em uma análise de processos sociais','No estudo das sociedades contemporâneas','Ao interpretar um fenômeno histórico','Em uma atividade de Geografia','Em um debate de cidadania','Na análise de políticas públicas','Em uma questão interdisciplinar','Ao examinar mudanças territoriais','Em um texto de Ciências Humanas','Ao estudar relações sociais','Em uma reflexão sobre a vida coletiva'];add(area,i,`${context[k%context.length]}, qual alternativa caracteriza corretamente ${theme[0]}?`,theme[1],[theme[2],theme[3],theme[4]],theme[5],level)}
else if(kind===6){const urban=30+k,other=20+(k%12),total=urban+other;add(area,i,`Uma região registra ${urban} mil habitantes urbanos e ${other} mil rurais. Qual é sua população total?`,total+' mil',[(total+10)+' mil',urban+' mil',other+' mil'],`A população total é a soma de habitantes urbanos e rurais: ${total} mil.`,level)}
else if(kind===7){const a=2000+k,b=a+4+(k%8),diff=b-a;add(area,i,`Um documento histórico foi publicado em ${a} e revisado em ${b}. Quantos anos se passaram?`,diff,[diff+1,diff+2,diff-1],`Subtraia o ano inicial do final: ${b} − ${a} = ${diff} anos.`,level)}
else if(kind===8){const km=100+10*k,scale=10+(k%6),ans=km/scale;add(area,i,`Um mapa esquemático usa a equivalência de 1 cm para ${scale} km. Quantos centímetros representam ${km} km?`,ans+' cm',[(ans+1)+' cm',(ans*2)+' cm',(ans+2)+' cm'],`Divida a distância real pela equivalência: ${km}/${scale} = ${ans} cm.`,level)}
else{const total=100+10*k,share=20+(k%5)*10,ans=total*share/100;add(area,i,`Em uma pesquisa com ${total} pessoas, ${share}% relataram usar transporte coletivo. Quantas pessoas são essas?`,ans,[ans+10,total-ans,ans+20],`Calcule ${share}% de ${total}: ${ans} pessoas.`,level)}
}
}
}
if(result.length!==856)throw Error('Contagem incorreta: '+result.length);
window.enemExtraShorts=result;
})();