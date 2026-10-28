/* Chat privado ENEM: requer Firebase configurado; nunca guardar senhas no app. */
(()=>{'use strict';
const cfg=window.ENEM_CHAT_FIREBASE||{};
const configured=!!(cfg.apiKey&&cfg.authDomain&&cfg.projectId&&cfg.appId);
let stop=null;
const $=id=>document.getElementById(id);
const msg=(t)=>{const el=$('enemChatStatus');if(el)el.textContent=t};
function loadSDK(){if(window.firebase?.apps)return Promise.resolve();return new Promise((resolve,reject)=>{const urls=['https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js'];let i=0;const next=()=>{if(i===urls.length)return resolve();const s=document.createElement('script');s.src=urls[i++];s.onload=next;s.onerror=()=>reject(Error('Não foi possível carregar o Firebase.'));document.head.append(s)};next()})}
function code(){const a=new Uint8Array(12);crypto.getRandomValues(a);return Array.from(a,b=>b.toString(16).padStart(2,'0')).join('')}
window.enemChatRender=async()=>{
if(stop){stop();stop=null}
const root=$('app');if(!root)return;
root.innerHTML=`<section class="panel"><h2>💬 Chat privado</h2><p>Conversa exclusiva entre duas contas. Seus dados de estudo continuam armazenados separadamente.</p><p id="enemChatStatus" role="status"></p><div id="enemChatAuth"><input id="enemChatEmail" type="email" placeholder="Seu e-mail" autocomplete="email" style="width:100%;margin:5px 0;padding:12px"><input id="enemChatPass" type="password" placeholder="Senha (mínimo 6 caracteres)" autocomplete="current-password" style="width:100%;margin:5px 0;padding:12px"><div style="display:flex;gap:8px;flex-wrap:wrap"><button id="enemChatSignup">Criar conta</button><button id="enemChatSignin">Entrar</button></div></div><div id="enemChatLogged" hidden><p id="enemChatUser"></p><button id="enemChatLogout">Sair da conta</button><hr><button id="enemChatCreate">Criar conversa privada</button><p>Ou digite o código de convite enviado pelo seu amigo:</p><input id="enemChatInvite" placeholder="Código de convite" maxlength="24" style="padding:12px;width:100%;max-width:330px"><button id="enemChatJoin">Entrar na conversa</button><div id="enemChatRoom" hidden><p><strong>Código de convite:</strong> <code id="enemChatCode"></code> <button type="button" id="enemChatCopy">📋 Copiar código</button></p><p id="enemChatMembers"></p><div id="enemChatMessages" aria-live="polite" style="height:310px;overflow-y:auto;background:#050505;color:#fff;border:1px solid #555;border-radius:10px;padding:12px"></div><form id="enemChatForm" style="display:flex;gap:7px;margin-top:10px"><input id="enemChatText" maxlength="2000" placeholder="Escreva uma mensagem..." required style="flex:1;min-width:0;padding:12px"><button type="button" id="enemChatPickImage" aria-label="Enviar imagem">🖼️ Imagem</button><input id="enemChatImageInput" type="file" accept="image/jpeg,image/png,image/webp,image/*" hidden><button type="submit">Enviar</button></form></div></div></section>`;
if(!configured){msg('Chat preparado, mas ainda não conectado. É necessário configurar um projeto Firebase e suas regras de segurança para trocar mensagens reais.');$('enemChatAuth').hidden=true;return}
try{await loadSDK();if(!firebase.apps.length)firebase.initializeApp(cfg);const auth=firebase.auth(),db=firebase.firestore();let roomId=null;const rooms=db.collection('enemPrivateRooms');const err=e=>msg('Não foi possível concluir: '+(e?.message||e));
const showRoom=id=>{if(stop){stop();stop=null}roomId=id;$('enemChatRoom').hidden=false;$('enemChatCode').textContent=id;$('enemChatCopy').onclick=async()=>{try{await navigator.clipboard.writeText(id);msg('Código copiado! Envie ao seu amigo.')}catch(e){const range=document.createRange();range.selectNodeContents($('enemChatCode'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);msg('Selecione Copiar no menu do celular para compartilhar o código.')}};stop=rooms.doc(id).onSnapshot(doc=>{if(!doc.exists){msg('Conversa não encontrada.');return}const data=doc.data();$('enemChatMembers').textContent='Participantes: '+data.members.length+' de 2';},err);const unSub=rooms.doc(id).collection('messages').orderBy('createdAt','asc').limitToLast(200).onSnapshot(snap=>{const box=$('enemChatMessages');if(!box)return;box.replaceChildren();snap.forEach(d=>{const v=d.data(),p=document.createElement('p');p.style.cssText='padding:10px 12px;border-radius:10px;margin:8px 0;line-height:1.45;overflow-wrap:anywhere;color:#fff;background:'+(v.uid===auth.currentUser?.uid?'#164c37':'#292929')+';border:1px solid '+(v.uid===auth.currentUser?.uid?'#2e8b65':'#555');p.textContent=(v.uid===auth.currentUser?.uid?'Você: ':'Amigo: ')+(v.imageData?'📷 Imagem':v.text||'');if(v.imageData&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v.imageData)){const img=document.createElement('img');img.src=v.imageData;img.alt='Imagem enviada no chat';img.loading='lazy';img.style.cssText='display:block;max-width:100%;max-height:360px;object-fit:contain;border-radius:8px;margin-top:7px;cursor:zoom-in';img.onclick=()=>{const overlay=document.createElement('div');overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Visualizar imagem');overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.96);display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box';const full=document.createElement('img');full.src=img.src;full.alt='Imagem ampliada';full.style.cssText='max-width:100%;max-height:90dvh;object-fit:contain';const close=document.createElement('button');close.type='button';close.textContent='✕ Fechar';close.style.cssText='position:absolute;top:12px;right:12px;z-index:1;padding:10px 14px;background:#222;color:white;border:1px solid #777;border-radius:8px';const dismiss=()=>{document.removeEventListener('keydown',onKey);overlay.remove()};const onKey=e=>{if(e.key==='Escape')dismiss()};close.onclick=dismiss;overlay.onclick=e=>{if(e.target===overlay)dismiss()};document.addEventListener('keydown',onKey);overlay.append(full,close);document.body.append(overlay);close.focus()};p.append(img)}box.append(p)});box.scrollTop=box.scrollHeight},err);const old=stop;stop=()=>{old();unSub()};localStorage.setItem('enem-chat-room',id)};
auth.onAuthStateChanged(async user=>{if(!$('enemChatAuth'))return;$('enemChatAuth').hidden=!!user;$('enemChatLogged').hidden=!user;if(!user)return;$('enemChatUser').textContent='Conectado: '+user.email;const saved=localStorage.getItem('enem-chat-room');if(saved){try{const doc=await rooms.doc(saved).get();if(doc.exists&&doc.data().members.includes(user.uid))showRoom(saved)}catch{}}});
$('enemChatSignup').onclick=()=>auth.createUserWithEmailAndPassword($('enemChatEmail').value.trim(),$('enemChatPass').value).catch(err);
$('enemChatSignin').onclick=()=>auth.signInWithEmailAndPassword($('enemChatEmail').value.trim(),$('enemChatPass').value).catch(err);
$('enemChatLogout').onclick=()=>{if(stop){stop();stop=null}localStorage.removeItem('enem-chat-room');auth.signOut().catch(err)};
$('enemChatCreate').onclick=async()=>{try{const id=code();await rooms.doc(id).set({members:[auth.currentUser.uid],createdAt:firebase.firestore.FieldValue.serverTimestamp()});showRoom(id);msg('Compartilhe o código com seu amigo. Somente duas contas podem participar.')}catch(e){err(e)}};
$('enemChatJoin').onclick=async()=>{try{const id=$('enemChatInvite').value.trim().toLowerCase();if(!/^[0-9a-f]{24}$/.test(id))throw Error('Código inválido.');const ref=rooms.doc(id);await db.runTransaction(async tx=>{const d=await tx.get(ref);if(!d.exists)throw Error('Conversa não encontrada.');const m=d.data().members;if(m.includes(auth.currentUser.uid))return;if(m.length!==1)throw Error('Esta conversa já possui dois participantes.');tx.update(ref,{members:[...m,auth.currentUser.uid]})});showRoom(id);msg('Conectado à conversa.')}catch(e){err(e)}};
$('enemChatPickImage').onclick=()=>$('enemChatImageInput').click();
$('enemChatImageInput').onchange=async e=>{
 const file=e.target.files?.[0];e.target.value='';if(!file||!roomId)return;
 if(!file.type.startsWith('image/')){msg('Selecione uma imagem.');return}
 if(file.size>15*1024*1024){msg('Imagem muito grande (máximo 15 MB antes da compressão).');return}
 const btn=$('enemChatPickImage');btn.disabled=true;msg('Preparando imagem...');
 try{
  const bitmap=await createImageBitmap(file);
  let scale=Math.min(1,1000/Math.max(bitmap.width,bitmap.height));
  let data='';
  for(let tries=0;tries<6;tries++){
   const canvas=document.createElement('canvas');
   canvas.width=Math.max(1,Math.round(bitmap.width*scale));
   canvas.height=Math.max(1,Math.round(bitmap.height*scale));
   canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);
   data=canvas.toDataURL('image/jpeg',Math.max(.35,.76-tries*.08));
   if(data.length<=180000)break;
   scale*=.72;
  }
  bitmap.close?.();
  if(data.length>180000)throw Error('Não foi possível reduzir a imagem. Tente uma imagem menor.');
  await rooms.doc(roomId).collection('messages').add({uid:auth.currentUser.uid,text:'',imageData:data,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
  msg('Imagem enviada.');
 }catch(ex){err(ex)}finally{btn.disabled=false}
};
$('enemChatForm').onsubmit=async e=>{e.preventDefault();const input=$('enemChatText'),value=input.value.trim();if(!roomId||!value)return;try{await rooms.doc(roomId).collection('messages').add({uid:auth.currentUser.uid,text:value,createdAt:firebase.firestore.FieldValue.serverTimestamp()});input.value=''}catch(e){err(e)}};
msg('Entre com sua conta para começar.');
}catch(e){msg('Erro ao conectar ao serviço de chat: '+e.message)}
};
})();