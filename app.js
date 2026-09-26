const KEY="tp25-state-v1";
const defaultState={
  accent:"#8fe3d2", secondary:true,
  subjects:[
    {id:"math",name:"Mathématiques",icon:"π",group:"main",color:"#55aef5",chapters:["Chapitre 1","Chapitre 2","Chapitre 3","Chapitre 4","Chapitre 5","Chapitre 6"],files:12},
    {id:"fr",name:"Français",icon:"▤",group:"main",color:"#d85b91",chapters:["Chapitre 1","Chapitre 2","Chapitre 3","Chapitre 4","Chapitre 5"],files:8},
    {id:"sci",name:"Sciences",icon:"⚗",group:"main",color:"#55d2a8",chapters:["Chapitre 1","Chapitre 2","Chapitre 3","Chapitre 4"],files:7},
    {id:"hist",name:"Histoire",icon:"♜",group:"main",color:"#e87645",chapters:["Chapitre 1","Chapitre 2","Chapitre 3"],files:6},
    {id:"ang",name:"Anglais",icon:"A",group:"other",color:"#9a68e8",chapters:["Chapter 1","Chapter 2"],files:4},
    {id:"geo",name:"Géographie",icon:"◎",group:"other",color:"#6d806e",chapters:["Chapitre 1","Chapitre 2","Chapitre 3"],files:5},
    {id:"eps",name:"EPS",icon:"⌁",group:"other",color:"#8a866e",chapters:["Chapitre 1"],files:2}
  ],
  files:[
    {name:"Exercice_math_chapitre3.pdf",subject:"Mathématiques",time:"il y a 2 h",type:"PDF"},
    {name:"Résumé_francais.docx",subject:"Français",time:"il y a 4 h",type:"DOC"},
    {name:"Fiche_sciences.pdf",subject:"Sciences",time:"il y a 5 h",type:"PDF"},
    {name:"Carte_Histoire.png",subject:"Histoire",time:"il y a 1 j",type:"IMG"},
    {name:"Cours_chapitre1.docx",subject:"Anglais",time:"il y a 1 j",type:"DOC"}
  ],
  projects:[
    {name:"Projet groupe - Environnement",desc:"4 fichiers · Mis à jour récemment"},
    {name:"Présentation classe",desc:"6 fichiers · Mis à jour récemment"}
  ]
};
let state=JSON.parse(localStorage.getItem(KEY)||"null")||structuredClone(defaultState);
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem(KEY,JSON.stringify(state)); render();}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function setAccent(c){state.accent=c;document.documentElement.style.setProperty("--accent",c);save();}
function subjectCard(s){
 return `<article class="subject-card" style="--card-color:${s.color}">
   <button class="card-menu" data-edit="${s.id}">•••</button>
   <div class="orb">${escapeHtml(s.icon||"•")}</div>
   <h3>${escapeHtml(s.name)}</h3><small>${s.chapters.length} chapitre${s.chapters.length>1?"s":""} · ${s.files||0} fichiers</small>
   <div class="card-actions"><button class="mini-btn" data-chapters="${s.id}">Chapitres</button><button class="mini-btn" data-delete="${s.id}">Supprimer</button></div>
 </article>`;
}
function renderSubjects(){
 const main=state.subjects.filter(s=>s.group==="main"), other=state.subjects.filter(s=>s.group==="other");
 const group=(title,items)=>`<section class="subject-group"><div class="group-head"><h3>${title}</h3><span class="muted">${items.length} matière${items.length>1?"s":""}</span></div><div class="subject-grid">${items.map(subjectCard).join("")}<button class="subject-card add-card" id="inlineAdd"><div><div class="plus">＋</div><small>Ajouter une matière</small></div></button></div></section>`;
 $("#subjectsMain").innerHTML=group("Matières principales",main)+`<section class="subject-group"><div class="group-head"><h3>Autres matières</h3><span class="muted">${other.length} matière${other.length>1?"s":""}</span></div><div class="subject-grid">${other.map(subjectCard).join("")}<button class="subject-card add-card" id="inlineAdd2"><div><div class="plus">＋</div><small>Ajouter une matière</small></div></button></div></section>`;
 $("#subjectsFull").innerHTML=`<div class="full-grid">${state.subjects.map(subjectCard).join("")}</div>`;
 $("#sideSubjectList").innerHTML=state.subjects.map(s=>`<button class="side-subject" data-chapters="${s.id}"><i class="dot" style="background:${s.color}"></i>${escapeHtml(s.name)}</button>`).join("")+`<button class="side-subject" id="addSubjectSide2">＋ Ajouter une matière</button>`;
}
function renderFiles(){
 const q=($("#searchInput")?.value||"").toLowerCase();
 const files=state.files.filter(f=>`${f.name} ${f.subject}`.toLowerCase().includes(q));
 $("#fileList").innerHTML=files.length?files.map((f,i)=>`<div class="file-row"><div class="file-icon">${escapeHtml(f.type)}</div><div class="grow"><strong>${escapeHtml(f.name)}</strong><span>${escapeHtml(f.subject)} · ${escapeHtml(f.time)}</span></div><button class="delete" data-file-delete="${i}">Supprimer</button></div>`).join(""):`<div class="settings-card"><p class="muted">Aucun fichier ne correspond à la recherche.</p></div>`;
}
function renderRecent(){
 $("#recentFiles").innerHTML=state.files.slice(0,5).map(f=>`<div class="recent"><div class="file-icon">${escapeHtml(f.type)}</div><div><strong>${escapeHtml(f.name)}</strong><span>${escapeHtml(f.subject)} · ${escapeHtml(f.time)}</span></div></div>`).join("");
}
function renderProjects(){
 $("#projectGrid").innerHTML=state.projects.map((p,i)=>`<div class="project"><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.desc)}</span><button class="delete" data-project-delete="${i}">Supprimer</button></div>`).join("");
}
function renderAnnouncements(){
 $("#announcements").innerHTML=[
 ["Rappel : devoir de maths","Le devoir sur les fonctions est à rendre pour vendredi !","12 avr. 2025"],
 ["Ajout de la matière Géographie","La matière Géographie est maintenant disponible sur le site !","10 avr. 2025"],
 ["Bonne semaine à tous !","N’oubliez pas de consulter les documents partagés dans le dossier commun.","7 avr. 2025"]
 ].map(a=>`<div class="announcement"><strong>${a[0]}</strong><p>${a[1]}</p><time>${a[2]}</time></div>`).join("");
}
function renderPalettes(){
 const colors=["#8fe3d2","#82b5a9","#d9b889","#e6d7c4","#79a18e","#a65c3f","#a64f61","#8c68b8","#657078"];
 $("#paletteChoices").innerHTML=colors.map(c=>`<button class="palette ${state.accent.toLowerCase()===c.toLowerCase()?"selected":""}" style="--c:${c}" data-palette="${c}" title="${c}"></button>`).join("");
 $("#accentPicker").value=state.accent;
}
function render(){document.documentElement.style.setProperty("--accent",state.accent);$("#secondaryToggle").checked=state.secondary;renderSubjects();renderFiles();renderRecent();renderProjects();renderAnnouncements();renderPalettes();bindDynamic();}
function bindDynamic(){
 $$("[data-edit]").forEach(b=>b.onclick=()=>openSubject(b.dataset.edit));
 $$("[data-delete]").forEach(b=>b.onclick=()=>{if(confirm("Supprimer cette matière ?")){state.subjects=state.subjects.filter(s=>s.id!==b.dataset.delete);save();}});
 $$("[data-chapters]").forEach(b=>b.onclick=()=>openChapters(b.dataset.chapters));
 $$("[data-file-delete]").forEach(b=>b.onclick=()=>{state.files.splice(+b.dataset.fileDelete,1);save();});
 $$("[data-project-delete]").forEach(b=>b.onclick=()=>{state.projects.splice(+b.dataset.projectDelete,1);save();});
 $$("#inlineAdd,#inlineAdd2,#addSubjectSide2").forEach(b=>b&&b.addEventListener("click",()=>openSubject()));
 $$("[data-view]").forEach(b=>b.onclick=()=>showView(b.dataset.view));
 $$("[data-palette]").forEach(b=>b.onclick=()=>setAccent(b.dataset.palette));
}
function showView(v){$$(".view").forEach(x=>x.classList.remove("active"));$(`#${v}View`).classList.add("active");$$(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===v));}
function openSubject(id){
 const s=state.subjects.find(x=>x.id===id);
 $("#subjectDialogTitle").textContent=s?"Modifier la matière":"Ajouter une matière";
 $("#subjectId").value=s?.id||"";$("#subjectName").value=s?.name||"";$("#subjectIcon").value=s?.icon||"📚";$("#subjectGroup").value=s?.group||"main";$("#subjectColor").value=s?.color||"#72d8c2";
 $("#subjectDialog").showModal();
}
$("#saveSubject").onclick=e=>{e.preventDefault();const id=$("#subjectId").value||crypto.randomUUID();const existing=state.subjects.find(s=>s.id===id);const s={id,name:$("#subjectName").value.trim(),icon:$("#subjectIcon").value.trim()||"📚",group:$("#subjectGroup").value,color:$("#subjectColor").value,chapters:existing?.chapters||[],files:existing?.files||0};if(!s.name)return; if(existing)Object.assign(existing,s);else state.subjects.push(s);$("#subjectDialog").close();save();};
function openChapters(id){const s=state.subjects.find(x=>x.id===id);$("#chapterSubjectId").value=id;$("#chapterList").innerHTML=s.chapters.map((c,i)=>`<div class="chapter-row"><span>${escapeHtml(c)}</span><button class="delete" data-chapter="${i}">×</button></div>`).join("")||`<p class="muted">Aucun chapitre pour le moment.</p>`;$("#chapterDialog").showModal();$$("#chapterList [data-chapter]").forEach(b=>b.onclick=()=>{s.chapters.splice(+b.dataset.chapter,1);openChapters(id);save();});}
$("#addChapter").onclick=e=>{e.preventDefault();const id=$("#chapterSubjectId").value,s=state.subjects.find(x=>x.id===id),name=$("#newChapter").value.trim();if(name){s.chapters.push(name);$("#newChapter").value="";openChapters(id);save();}};
$("#addSubjectBtn").onclick=()=>openSubject();$("#addSubjectBtn2").onclick=()=>openSubject();$("#addSubjectSide").onclick=()=>openSubject();$("#customizeBtn").onclick=()=>showView("settings");
$("#addProjectBtn").onclick=()=>$("#projectDialog").showModal();
$("#saveProject").onclick=e=>{e.preventDefault();state.projects.push({name:$("#projectName").value.trim(),desc:$("#projectDesc").value.trim()||"Nouveau projet"});$("#projectName").value="";$("#projectDesc").value="";$("#projectDialog").close();save();};
$("#fileInput").onchange=e=>{[...e.target.files].forEach(f=>state.files.unshift({name:f.name,subject:"Documents communs",time:"à l'instant",type:f.name.split(".").pop().slice(0,4).toUpperCase()}));save();e.target.value="";};
$("#searchInput").oninput=renderFiles;
$("#accentPicker").oninput=e=>setAccent(e.target.value);
$("#secondaryToggle").onchange=e=>{state.secondary=e.target.checked;save();};
$("#themeToggle").onclick=()=>document.body.classList.toggle("light");
$$(".nav-item").forEach(b=>b.onclick=()=>showView(b.dataset.view));
render();
