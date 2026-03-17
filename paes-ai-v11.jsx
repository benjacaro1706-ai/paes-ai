import{useState,useEffect,useRef,useCallback}from"react";
const C={bg:"#F7F9FF",s1:"#FFF",s2:"#EEF2FF",card:"#FFF",border:"#E0E7FF",accent:"#4F46E5",aL:"#EEF2FF",gold:"#D97706",gL:"#FFFBEB",ok:"#059669",oL:"#ECFDF5",bad:"#DC2626",bL:"#FEF2F2",warn:"#D97706",wL:"#FFFBEB",purple:"#7C3AED",pL:"#F5F3FF",text:"#0F172A",sub:"#475569",muted:"#94A3B8",sh:"0 1px 3px rgba(79,70,229,.08)"};
const mC=id=>({m1:"#D97706",ciencias:"#059669"}[id]||C.accent);
const mB=id=>({m1:"#FFFBEB",ciencias:"#ECFDF5"}[id]||C.aL);
const genId=()=>{const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="#PAE-";for(let i=0;i<6;i++)r+=c[~~(Math.random()*c.length)];return r;};
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
let vxOk=false;
const unlockVx=()=>{if(vxOk||!window.speechSynthesis)return;const u=new SpeechSynthesisUtterance("");u.volume=0;window.speechSynthesis.speak(u);vxOk=true;};

const GS=`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Syne:wght@700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}body{background:#F7F9FF;font-family:'Plus Jakarta Sans',sans-serif;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#C7D2FE;border-radius:4px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-14px)}60%{transform:translateY(-5px)}}
@keyframes cPop{0%{transform:scale(1)}40%{transform:scale(1.05)}100%{transform:scale(1)}}
@keyframes wWob{0%,100%{transform:translateX(0)}30%{transform:translateX(-5px)}70%{transform:translateX(5px)}}
@keyframes armL{0%,100%{transform:rotate(0)}50%{transform:rotate(-35deg)}}
@keyframes armR{0%,100%{transform:rotate(0)}50%{transform:rotate(35deg)}}
@keyframes talkM{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.7)}}
@keyframes blink{0%,85%,100%{transform:scaleY(1)}92%{transform:scaleY(.08)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.1)}}
@keyframes barG{from{width:0}to{width:100%}}
@keyframes confetti{0%{transform:translateY(-10px) rotate(0);opacity:1}100%{transform:translateY(600px) rotate(720deg);opacity:0}}
@keyframes stg{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
button:active{opacity:.82;transform:scale(.97)!important;}
input:focus,select:focus{outline:none;}a{text-decoration:none;}`;

const QS={
  m1:[
    {id:1,src:"PAES M1·2023",dif:"Baja",tema:"Porcentajes",q:"¿Cuánto es el 30% de 200?",ops:["A) 30","B) 50","C) 60","D) 70"],ok:2,reel:{char:"30%",col:"#D97706",mood:"happy",lines:["¡Hola! Soy el 30 por ciento 👋","Para calcularme saca el 10% primero","10% de 200 = 200÷10 = 20","Ahora multiplícame por 3","3 × 20 = ¡60! 🎉","10% primero, luego multiplica"]},exp:{ok:"30%=0,30×200=60 ✓",err:{0:"Calculaste el 15%.",1:"Eso es el 25%.",3:"Ninguna op. da 70."}}},
    {id:2,src:"PAES M1·2022",dif:"Media",tema:"Álgebra",q:"Si 2x + 5 = 13, ¿cuánto vale x?",ops:["A) 3","B) 4","C) 6","D) 9"],ok:1,reel:{char:"2x",col:"#4F46E5",mood:"explain",lines:["¡Soy la ecuación clásica! ⚖️","PASO 1: el +5 pasa al otro lado","2x = 13-5 = 8","PASO 2: divido por 2","8÷2 = ¡4! ✨","Suma/resta primero, divide después"]},exp:{ok:"2x=8→x=4 ✓",err:{0:"8÷2=4 no 3.",2:"2(6)+5=17≠13.",3:"2(9)+5=23≠13."}}},
    {id:3,src:"PAES M1·2023",dif:"Baja",tema:"Geometría",q:"Área de un rectángulo 7cm × 4cm:",ops:["A) 11cm²","B) 22cm²","C) 28cm²","D) 14cm²"],ok:2,reel:{char:"A=bh",col:"#059669",mood:"happy",lines:["¡Soy el ÁREA del rectángulo! 📐","Mi fórmula: base × altura","¡No soy el perímetro que suma!","Yo MULTIPLICO","7 × 4 = ¡28cm²!","Base × altura = YO"]},exp:{ok:"7×4=28cm² ✓",err:{0:"11=7+4 es perímetro parcial.",1:"22 es el perímetro.",3:"14 sería triángulo."}}},
    {id:4,src:"PAES M1·2024",dif:"Media",tema:"Fracciones",q:"¿Cuánto es ³⁄₄ + ²⁄₃?",ops:["A) 5/7","B) 17/12","C) 5/12","D) 1"],ok:1,reel:{char:"MCM",col:"#7C3AED",mood:"explain",lines:["¡Soy la suma de fracciones! 🍕","Nunca sumes sin MCM primero","MCM(4,3)=12","¾→9/12 y ⅔→8/12","9+8=17 → ¡17/12!","Denominadores distintos=busca MCM"]},exp:{ok:"MCM=12→17/12 ✓",err:{0:"No sumes num y den directo.",2:"Restaste en vez de sumar.",3:"12/12=1 pero sale 17/12."}}},
    {id:5,src:"PAES M1·2022",dif:"Alta",tema:"Funciones",q:"Si f(x)=x²−2x+1, ¿f(3)?",ops:["A) 2","B) 4","C) 6","D) 8"],ok:1,reel:{char:"f(x)",col:"#DB2777",mood:"excited",lines:["¡Soy la función cuadrática! 📈","Evalúame con paréntesis siempre","f(3)=(3)²-2(3)+1","(3)²=9, -2(3)=-6","9-6+1 = ¡4!","Paréntesis = tu mejor amigo 💪"]},exp:{ok:"9-6+1=4 ✓",err:{0:"Error de signo.",2:"-2(3)=-6 no -3.",3:"9-6+1≠8."}}},
    {id:6,src:"PAES M1·2023",dif:"Baja",tema:"Números",q:"¿Cuánto es (−3)×(−4)?",ops:["A) −12","B) −7","C) 7","D) 12"],ok:3,reel:{char:"±",col:"#059669",mood:"angry",lines:["¡SOY LA REGLA DE SIGNOS! 😤","(-) × (-) = ¡POSITIVO! 🟢","(-) × (+) = NEGATIVO 🔴","(+) × (+) = POSITIVO 🟢","(-3)×(-4)=+12","Mismos signos = positivo. Siempre."]},exp:{ok:"(-)×(-)=+12 ✓",err:{0:"-12 sería signos distintos.",1:"-7=suma.",2:"7=suma sin signo."}}},
    {id:7,src:"PAES M1·2024",dif:"Media",tema:"Álgebra",q:"¿Resultado de (x+3)²?",ops:["A) x²+9","B) x²+3x+9","C) x²+6x+9","D) x²+6x+3"],ok:2,reel:{char:"(a+b)²",col:"#4F46E5",mood:"angry",lines:["¡Soy el cuadrado del binomio! 😤","(a+b)² NO es solo a²+b²","Fórmula: a²+2ab+b²","(x+3)²: 2ab=2(x)(3)=6x","¡x²+6x+9! Los TRES términos","Nunca olvides el término del medio"]},exp:{ok:"x²+6x+9 ✓",err:{0:"Olvidaste el término del medio.",1:"El medio es 6x no 3x.",3:"El último es 9 no 3."}}},
    {id:8,src:"PAES M1·2022",dif:"Baja",tema:"Estadística",q:"Datos: 4,7,5,8,6. ¿Promedio?",ops:["A) 5","B) 6","C) 7","D) 8"],ok:1,reel:{char:"x̄",col:"#4F46E5",mood:"explain",lines:["¡Soy el PROMEDIO! 📊","PASO 1: suma todos → 30","PASO 2: cuántos hay → 5","PASO 3: 30÷5 = ¡6!","Suma, cuenta, divide","Siempre el mismo proceso 🎯"]},exp:{ok:"30÷5=6 ✓",err:{0:"Suma=30 no 25.",2:"Dividiste por 4.",3:"8 es el máximo."}}},
    {id:9,src:"PAES M1·2023",dif:"Media",tema:"Geometría",q:"Triángulo con 60° y 80°. ¿El tercero?",ops:["A) 30°","B) 40°","C) 50°","D) 60°"],ok:1,reel:{char:"180°",col:"#059669",mood:"explain",lines:["¡Soy la suma de ángulos! 📐","Todo triángulo suma 180°","60°+80°=140°","180°-140°=¡40°! ✅","180° siempre sin excepción","Sale en TODAS las PAES"]},exp:{ok:"180-60-80=40° ✓",err:{0:"40 no 30.",2:"40 no 50.",3:"60+80+60=200≠180."}}},
    {id:10,src:"PAES M1·2024",dif:"Alta",tema:"Potencias",q:"¿Cuánto es 2³+3²?",ops:["A) 13","B) 17","C) 25","D) 35"],ok:1,reel:{char:"aⁿ",col:"#D97706",mood:"excited",lines:["¡Somos las POTENCIAS! ⚡","2³ NO es 2×3","2³=2×2×2=¡8!","3²=3×3=¡9!","8+9=¡17! 🏆","Potencia≠multiplicación"]},exp:{ok:"8+9=17 ✓",err:{0:"Error aritmético.",2:"(2+3)²=25.",3:"Multiplicaste."}}},
  ],
  ciencias:[
    {id:30,src:"PAES Ci·2023",dif:"Baja",tema:"Biología celular",q:"¿Dónde ocurre la fotosíntesis?",ops:["A) Mitocondria","B) Ribosoma","C) Cloroplasto","D) Núcleo"],ok:2,reel:{char:"🌿",col:"#059669",mood:"happy",lines:["¡Soy el CLOROPLASTO! 🌿","Único orgánulo verde","Tengo clorofila que capta luz","Con luz hago FOTOSÍNTESIS","CO₂+H₂O→glucosa+O₂","CLOROplasto=CLOROfila=FOTO"]},exp:{ok:"Cloroplasto ✓",err:{0:"Mitocondria=respiración.",1:"Ribosoma=proteínas.",3:"Núcleo=ADN."}}},
    {id:31,src:"PAES Ci·2022",dif:"Media",tema:"Física",q:"72 km/h = ? m/s",ops:["A) 72","B) 36","C) 20","D) 7,2"],ok:2,reel:{char:"÷3,6",col:"#059669",mood:"explain",lines:["¡Soy la conversión de velocidad!","Mi secreto: el número 3,6","km/h→m/s: divide por 3,6","m/s→km/h: multiplica por 3,6","72÷3,6=¡20 m/s!","3,6 = tu mejor amigo ⚡"]},exp:{ok:"72÷3,6=20m/s ✓",err:{0:"72m/s≈260km/h.",1:"÷2 no es la fórmula.",3:"÷10 tampoco."}}},
    {id:32,src:"PAES Ci·2023",dif:"Baja",tema:"Química",q:"¿Fórmula del agua?",ops:["A) CO₂","B) NaCl","C) O₂","D) H₂O"],ok:3,reel:{char:"H₂O",col:"#059669",mood:"happy",lines:["¡Soy el AGUA! 💧","Mi fórmula: H₂O","2H + 1O","CO₂=dióxido, NaCl=sal","O₂=oxígeno","¡Y yo! H₂O=AGUA 💙"]},exp:{ok:"H₂O ✓",err:{0:"CO₂=dióxido.",1:"NaCl=sal.",2:"O₂=oxígeno."}}},
    {id:33,src:"PAES Ci·2024",dif:"Media",tema:"Biología",q:"Función del sistema digestivo:",ops:["A) Transportar O₂","B) Filtrar sangre","C) Absorber nutrientes","D) Hormonas"],ok:2,reel:{char:"🍎",col:"#059669",mood:"explain",lines:["¡Soy el DIGESTIVO! 🍎","Mi función: absorber nutrientes","Digestivo=ABSORBER","Circulatorio=TRANSPORTAR","Respiratorio=INTERCAMBIO","Excretor=FILTRAR"]},exp:{ok:"Absorbe nutrientes ✓",err:{0:"Transportar=circulatorio.",1:"Filtrar=excretor.",3:"Hormonas=endocrino."}}},
    {id:34,src:"PAES Ci·2023",dif:"Alta",tema:"Física",q:"10→30m/s en 5s. ¿Aceleración?",ops:["A) 2m/s²","B) 4m/s²","C) 6m/s²","D) 8m/s²"],ok:1,reel:{char:"a=Δv/t",col:"#059669",mood:"excited",lines:["¡Soy la ACELERACIÓN! ⚡","a=Δv÷t","Paso 1: resta→30-10=20","Paso 2: divide→20÷5=4","¡4m/s²!","Δv÷t siempre"]},exp:{ok:"20÷5=4m/s² ✓",err:{0:"Dividiste 10/5=2.",2:"No corresponde.",3:"(30-10)÷5=4."}}},
    {id:35,src:"PAES Ci·2022",dif:"Baja",tema:"Química",q:"Agua con sal disuelta. ¿Qué tipo de mezcla?",ops:["A) Heterogénea","B) Homogénea","C) Compuesto puro","D) Elemento"],ok:1,reel:{char:"🧂",col:"#059669",mood:"explain",lines:["¡Soy la HOMOGÉNEA! 🧂","No me ves a simple vista","Sal disuelta=uniforme","HETERO=ves ambos componentes","Arena en agua→ves los granos","Homogénea=uniforme"]},exp:{ok:"Homogénea ✓",err:{0:"Hetero=distingues partes.",2:"Compuesto tiene fórmula fija.",3:"Elemento=un tipo de átomo."}}},
  ],
};
const MATERIAS=[{id:"m1",label:"Matemática M1",icon:"📐",sub:"Álgebra · Geometría · Números",on:true},{id:"ciencias",label:"Ciencias",icon:"🔬",sub:"Biología · Física · Química",on:true},{id:"m2",label:"Matemática M2",icon:"∑",sub:"Próximamente",on:false},{id:"hist",label:"Historia",icon:"🗺",sub:"Próximamente",on:false}];
const CARRERAS=[{id:"medicina",label:"Medicina",pts:870,icon:"🩺"},{id:"ing_civil",label:"Ingeniería Civil",pts:760,icon:"🏗️"},{id:"ing_com",label:"Ingeniería Comercial",pts:730,icon:"📊"},{id:"derecho",label:"Derecho",pts:740,icon:"⚖️"},{id:"inform",label:"Ing. Informática",pts:650,icon:"💻"},{id:"psico",label:"Psicología",pts:680,icon:"🧠"},{id:"arq",label:"Arquitectura",pts:680,icon:"🏛️"},{id:"enfer",label:"Enfermería",pts:680,icon:"💉"},{id:"conta",label:"Contador Auditor",pts:560,icon:"🧾"},{id:"ped",label:"Pedagogía Básica",pts:540,icon:"📚"}];

const Tag=({text,color,bg,sm})=><span style={{fontSize:sm?10:11,fontWeight:700,letterSpacing:.5,textTransform:"uppercase",padding:sm?"2px 8px":"3px 10px",borderRadius:6,background:bg||(color+"18"),color,border:`1px solid ${color}22`}}>{text}</span>;
const Bar=({pct,color=C.accent,h=5})=><div style={{height:h,background:C.border,borderRadius:h,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,pct)}%`,borderRadius:h,background:color,transition:"width .6s ease"}}/></div>;
const Topbar=({title,sub,onBack})=><div style={{background:C.s1,borderBottom:`1px solid ${C.border}`,padding:"14px 20px",position:"sticky",top:0,zIndex:20}}><div style={{maxWidth:440,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>{onBack&&<button onClick={onBack} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:10,width:36,height:36,color:C.sub,cursor:"pointer",fontSize:16,flexShrink:0}}>←</button>}<div style={{flex:1}}><p style={{margin:0,fontSize:15,fontWeight:800,color:C.text}}>{title}</p>{sub&&<p style={{margin:0,fontSize:11,color:C.muted}}>{sub}</p>}</div></div></div>;

function useSpeech(){
  const speak=useCallback((text,onEnd)=>{
    if(!window.speechSynthesis){onEnd?.();return;}
    window.speechSynthesis.cancel();
    const go=()=>{const u=new SpeechSynthesisUtterance(text);u.lang="es-ES";u.rate=.88;u.pitch=1.1;u.volume=1;const vs=window.speechSynthesis.getVoices();const v=vs.find(x=>x.lang.startsWith("es"))||null;if(v)u.voice=v;u.onend=()=>onEnd?.();u.onerror=()=>onEnd?.();window.speechSynthesis.speak(u);};
    window.speechSynthesis.getVoices().length>0?go():(window.speechSynthesis.onvoiceschanged=go);
  },[]);
  const stop=useCallback(()=>{window.speechSynthesis?.cancel();},[]);
  return{speak,stop};
}

function CharSvg({col,mood,talking,phase}){
  const angry=mood==="angry",happy=mood==="happy"||mood==="excited",eC=angry?"#CC0000":"#1a1a2e";
  return<svg width="96" height="118" viewBox="0 0 100 120" style={{animation:phase==="typing"&&talking?"bounce .4s ease-in-out infinite":phase==="typing"?"float 2s ease-in-out infinite":"none",filter:`drop-shadow(0 4px 14px ${col}77)`,overflow:"visible"}}>
    <ellipse cx="50" cy="114" rx="30" ry="5" fill="rgba(0,0,0,.18)"/>
    <ellipse cx="50" cy="70" rx="27" ry="31" fill={col}/>
    <ellipse cx="50" cy="68" rx="21" ry="25" fill={col} opacity=".25"/>
    <circle cx="50" cy="38" r="27" fill={col}/>
    {happy&&<><circle cx="28" cy="43" r="7" fill="#ffaaaa" opacity=".55"/><circle cx="72" cy="43" r="7" fill="#ffaaaa" opacity=".55"/></>}
    <ellipse cx="37" cy="34" rx="6" ry="6" fill="white" style={{animation:"blink 3s ease-in-out infinite"}}/>
    <circle cx="38" cy="35" r="3.5" fill={eC}/><circle cx="39.5" cy="33.5" r="1" fill="white"/>
    <ellipse cx="63" cy="34" rx="6" ry="6" fill="white" style={{animation:"blink 3s ease-in-out .3s infinite"}}/>
    <circle cx="64" cy="35" r="3.5" fill={eC}/><circle cx="65.5" cy="33.5" r="1" fill="white"/>
    {angry?<><path d="M29,26 L43,30" stroke="#333" strokeWidth="3" strokeLinecap="round"/><path d="M57,30 L71,26" stroke="#333" strokeWidth="3" strokeLinecap="round"/></>:happy?<><path d="M30,27 Q36,22 43,27" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".8"/><path d="M57,27 Q63,22 70,27" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".8"/></>:<><path d="M30,28 L43,28" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6"/><path d="M57,28 L70,28" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6"/></>}
    {talking?<ellipse cx="50" cy="50" rx="9" ry="7" fill={angry?"#8B0000":"#1a1a2e"} style={{animation:"talkM .2s ease-in-out infinite"}}/>:phase==="done"||happy?<path d="M37,50 Q50,61 63,50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>:angry?<path d="M38,54 Q50,47 62,54" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>:<path d="M40,50 Q50,56 60,50" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>}
    <path d="M23,62 Q10,54 8,44" stroke={col} strokeWidth="10" strokeLinecap="round" fill="none" style={{animation:phase==="typing"&&talking?"armL .4s ease-in-out infinite":"none",transformOrigin:"23px 62px"}}/>
    <path d="M77,62 Q90,54 92,44" stroke={col} strokeWidth="10" strokeLinecap="round" fill="none" style={{animation:phase==="typing"&&talking?"armR .4s ease-in-out infinite":"none",transformOrigin:"77px 62px"}}/>
    <circle cx="8" cy="42" r="7" fill={col}/><circle cx="92" cy="42" r="7" fill={col}/>
    <rect x="35" y="97" width="12" height="17" rx="6" fill={col}/><rect x="53" y="97" width="12" height="17" rx="6" fill={col}/>
    <ellipse cx="41" cy="114" rx="10" ry="5" fill={col} opacity=".85"/><ellipse cx="59" cy="114" rx="10" ry="5" fill={col} opacity=".85"/>
    <text x="50" y="75" textAnchor="middle" fontSize="8" fontWeight="900" fontFamily="sans-serif" fill="rgba(255,255,255,.85)">{(""||"").slice(0,0)}</text>
  </svg>;
}

function SpeakingChar({q}){
  const[li,setLi]=useState(-1),[ci,setCi]=useState(0),[phase,setPhase]=useState("idle"),[talking,setTalking]=useState(false);
  const{speak,stop}=useSpeech();const tmr=useRef(null);
  const lines=q.reel.lines,col=q.reel.col,mood=q.reel.mood,lbl=q.reel.char;
  const reset=()=>{clearTimeout(tmr.current);stop();setLi(-1);setCi(0);setPhase("idle");setTalking(false);};
  useEffect(()=>{
    if(phase!=="typing"||li<0)return;
    const line=lines[li]||"";
    if(ci<line.length){tmr.current=setTimeout(()=>setCi(c=>c+1),28);}
    else{setTalking(true);speak(line,()=>{setTalking(false);tmr.current=setTimeout(()=>{if(li+1<lines.length){setLi(l=>l+1);setCi(0);}else setPhase("done");},500);});}
    return()=>clearTimeout(tmr.current);
  },[phase,li,ci]);
  const start=()=>{unlockVx();reset();setTimeout(()=>{setPhase("typing");setLi(0);setCi(0);},80);};
  const skip=()=>{clearTimeout(tmr.current);stop();setTalking(false);if(li+1<lines.length){setLi(l=>l+1);setCi(0);}else setPhase("done");};
  const cur=li>=0?(lines[li]||"").slice(0,ci):"";
  const prog=li<0?0:Math.round((li/lines.length)*100);
  return<div style={{borderRadius:18,overflow:"hidden",background:"linear-gradient(160deg,#0f0c29,#1a1040,#001a2e)",minHeight:280}}>
    <div style={{height:3,background:"rgba(255,255,255,.1)"}}><div style={{height:"100%",width:`${prog}%`,background:col,transition:"width .4s"}}/></div>
    <div style={{padding:"12px 16px 0",display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:26,height:26,borderRadius:"50%",background:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#000"}}>⚡</div>
      <div><p style={{margin:0,fontSize:11,fontWeight:800,color:"#fff"}}>{q.tema}</p><p style={{margin:0,fontSize:9,color:"rgba(255,255,255,.5)"}}>{phase==="idle"?"▶ Toca play · voz real 🎙️":phase==="done"?"¡Listo! +10XP":"Escuchando..."}</p></div>
      <div style={{marginLeft:"auto",background:"rgba(255,255,255,.1)",borderRadius:20,padding:"2px 8px"}}><span style={{fontSize:9,fontWeight:800,color:col}}>{Math.max(0,li)+1}/{lines.length}</span></div>
    </div>
    <div style={{padding:"10px 16px 0",display:"flex",alignItems:"flex-end",gap:10}}>
      <div style={{flexShrink:0}}><CharSvg col={col} mood={mood} talking={talking} phase={phase}/><p style={{textAlign:"center",fontSize:8,fontWeight:900,color:col,marginTop:-6}}>{lbl}</p></div>
      <div style={{flex:1}}>
        <div style={{background:"rgba(255,255,255,.12)",backdropFilter:"blur(8px)",borderRadius:"16px 16px 16px 4px",padding:"11px 13px",border:"1px solid rgba(255,255,255,.2)",minHeight:62}}>
          {phase==="idle"&&<div style={{display:"flex",gap:7,alignItems:"center"}}><span style={{fontSize:16,animation:"float 2s ease-in-out infinite"}}>👋</span><p style={{margin:0,fontSize:12,color:"rgba(255,255,255,.55)",fontStyle:"italic"}}>Toca play para escucharme</p></div>}
          {phase!=="idle"&&<p style={{margin:0,fontSize:13,color:"#fff",fontWeight:600,lineHeight:1.5,minHeight:40}}>{cur}{phase==="typing"&&<span style={{animation:"pulse .4s ease-in-out infinite"}}>▋</span>}</p>}
          {phase==="done"&&<div style={{marginTop:6,display:"flex",gap:6,alignItems:"center",background:"rgba(255,255,255,.08)",borderRadius:7,padding:"5px 10px"}}><span>🏆</span><p style={{margin:0,fontSize:10,color:col,fontWeight:700}}>+10XP por ver el reel</p></div>}
        </div>
      </div>
    </div>
    <div style={{display:"flex",gap:4,padding:"8px 16px 0"}}>{lines.map((_,i)=><div key={i} style={{flex:1,height:3,borderRadius:3,background:i<=li&&phase!=="idle"?col:"rgba(255,255,255,.15)"}}/>)}</div>
    <div style={{padding:"10px 16px 14px",display:"flex",gap:7}}>
      {phase==="idle"&&<button onClick={start} style={{flex:1,padding:"11px",background:col,border:"none",borderRadius:11,color:"#000",fontSize:13,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>▶ Escuchar con voz</button>}
      {phase==="typing"&&<><button onClick={reset} style={{flex:1,padding:"9px",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:11,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>⏹ Parar</button><button onClick={skip} style={{flex:1,padding:"9px",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:11,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>Saltar →</button></>}
      {phase==="done"&&<button onClick={reset} style={{flex:1,padding:"9px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",borderRadius:11,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>↺ Repetir</button>}
    </div>
  </div>;
}

function Wrapped({user,car,pA,pO,plan,onDone}){
  const[slide,setSlide]=useState(0);const{speak}=useSpeech();
  const br=Math.max(0,pO-pA);
  const COLS=["#4F46E5","#D97706","#059669","#DC2626","#7C3AED","#DB2777"];
  const conf=Array.from({length:18},(_,i)=>({x:Math.random()*100,dl:Math.random()*1.5,dur:1.8+Math.random()*2,col:COLS[i%6],s:5+Math.random()*9}));
  const slides=[
    {bg:"linear-gradient(135deg,#1a0533,#0d1b4b)",e:"🎯",t:"Analizamos tu situación",sub:`Para entrar a ${car.label}`,col:"#00e5ff",sp:`Analizamos tu situación para entrar a ${car.label}.`},
    {bg:"linear-gradient(135deg,#0a1628,#1a3a2a)",e:plan.e,t:plan.t,sub:br===0?"¡Ya cumples!":` ${pA} pts · necesitas ${pO}`,col:br===0?C.ok:C.warn,extra:br>0?`Faltan ${br} puntos`:null,sp:br===0?`¡Ya tienes los ${pO} pts!`:`Tu puntaje es ${pA}, necesitas ${pO}. Faltan ${br} puntos.`},
    {bg:"linear-gradient(135deg,#0f2027,#2c5364)",e:"📅",t:"Tu plan de estudio",sub:"Creado solo para ti",col:C.accent,stats:[{ic:"📝",v:plan.d,lb:"preguntas/día"},{ic:"📋",v:plan.s,lb:"ensayos/sem"}],sp:`Tu plan: ${plan.d} preguntas por día y ${plan.s} ensayo${plan.s>1?"s":""} por semana.`},
    {bg:"linear-gradient(135deg,#1a1a2e,#0f3460)",e:"🚀",t:"¡Tú puedes lograrlo!",sub:plan.msg,col:C.gold,sp:plan.msg},
  ];
  useEffect(()=>{if(slide<slides.length){unlockVx();speak(slides[slide].sp||"");const t=setTimeout(()=>setSlide(n=>n+1),4500);return()=>clearTimeout(t);}},[slide]);

  if(slide>=slides.length)return<div style={{minHeight:"100vh",background:"linear-gradient(135deg,#1a0533,#0d1b4b)",display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 24px",position:"relative",overflow:"hidden"}}>
    <style>{GS}</style>
    {conf.map((c,i)=><div key={i} style={{position:"absolute",left:`${c.x}%`,top:-20,width:c.s,height:c.s*1.6,background:c.col,borderRadius:2,animation:`confetti ${c.dur}s ${c.dl}s linear infinite`,pointerEvents:"none"}}/>)}
    <div style={{width:"100%",maxWidth:400,textAlign:"center",zIndex:2}}>
      <div style={{fontSize:80,marginBottom:20,animation:"float 2s ease-in-out infinite"}}>🎓</div>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:28,color:"#fff",margin:"0 0 10px"}}>Tu plan está listo</h2>
      <p style={{fontSize:15,color:"rgba(255,255,255,.7)",lineHeight:1.7,margin:"0 0 28px"}}>{plan.msg}</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
        {[["📝",plan.d,"preguntas/día"],["📋",plan.s,"ensayos/sem"],["🎯",car.label.split(" ")[0],"carrera"],["⚡",br>0?`~${Math.ceil(br/30)}m`:"¡Ya!","estimado"]].map(([ic,v,lb],i)=>(
          <div key={i} style={{background:"rgba(255,255,255,.1)",borderRadius:16,padding:16,textAlign:"center",border:"1px solid rgba(255,255,255,.15)",animation:`stg ${.3+i*.12}s ease`}}>
            <div style={{fontSize:22,marginBottom:6}}>{ic}</div><div style={{fontSize:22,fontWeight:900,color:"#fff",fontFamily:"'Syne',sans-serif",lineHeight:1}}>{v}</div><div style={{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:4}}>{lb}</div>
          </div>
        ))}
      </div>
      <button onClick={onDone} style={{width:"100%",padding:16,background:"linear-gradient(135deg,#4F46E5,#7C3AED)",border:"none",borderRadius:14,color:"#fff",fontSize:16,fontWeight:900,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:"0 4px 20px rgba(79,70,229,.5)"}}>¡A practicar! 🚀</button>
    </div>
  </div>;

  const s=slides[slide];
  return<div style={{minHeight:"100vh",background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 24px",position:"relative",overflow:"hidden"}}>
    <style>{GS}</style>
    <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:"rgba(255,255,255,.1)"}}><div key={slide} style={{height:"100%",background:s.col,borderRadius:2,animation:"barG 4.5s linear forwards"}}/></div>
    {[0,1,2,3].map(i=><div key={i} style={{position:"absolute",width:80+i*30,height:80+i*30,borderRadius:"50%",background:`radial-gradient(circle,${s.col}18,transparent 70%)`,left:`${[10,60,20,70][i]}%`,top:`${[20,10,60,40][i]}%`,animation:`float ${3+i*.7}s ease-in-out ${i*.4}s infinite`,pointerEvents:"none"}}/>)}
    <div style={{width:"100%",maxWidth:400,textAlign:"center",zIndex:2}}>
      <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:36}}>{slides.map((_,i)=><div key={i} style={{width:i===slide?28:8,height:8,borderRadius:4,background:i<=slide?s.col:"rgba(255,255,255,.2)",transition:"all .4s"}}/>)}</div>
      <div key={slide} style={{animation:"stg .45s ease"}}>
        <div style={{fontSize:80,marginBottom:20,animation:"popIn .5s ease"}}>{s.e}</div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:30,color:"#fff",margin:"0 0 10px"}}>{s.t}</h2>
        <p style={{fontSize:15,color:"rgba(255,255,255,.7)",margin:"0 0 18px",lineHeight:1.6}}>{s.sub}</p>
        {s.extra&&<div style={{background:"rgba(255,255,255,.12)",borderRadius:16,padding:"14px 24px",marginBottom:18,display:"inline-block",border:"1px solid rgba(255,255,255,.2)"}}><span style={{fontSize:22,fontWeight:900,color:s.col,fontFamily:"'Syne',sans-serif"}}>{s.extra}</span></div>}
        {s.stats&&<div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:18}}>{s.stats.map(({ic,v,lb},i)=><div key={i} style={{background:"rgba(255,255,255,.1)",borderRadius:14,padding:"14px 16px",textAlign:"center",border:"1px solid rgba(255,255,255,.15)"}}><div style={{fontSize:20,marginBottom:4}}>{ic}</div><div style={{fontSize:24,fontWeight:900,color:"#fff",fontFamily:"'Syne',sans-serif"}}>{v}</div><div style={{fontSize:10,color:"rgba(255,255,255,.5)",marginTop:2}}>{lb}</div></div>)}</div>}
      </div>
      <button onClick={()=>setSlide(n=>n+1)} style={{background:"rgba(255,255,255,.14)",border:"1px solid rgba(255,255,255,.25)",borderRadius:10,padding:"10px 20px",color:"rgba(255,255,255,.7)",fontSize:12,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Saltar →</button>
    </div>
  </div>;
}

function CorreccionModal({q,sel,onNext,isLast,mat}){
  const[tab,setTab]=useState("texto");
  const ok=sel===q.ok,col=ok?C.ok:C.bad,exp=ok?q.exp.ok:(q.exp.err[sel]||"Revisa: "+q.tema);
  const yt=`https://www.youtube.com/results?search_query=${encodeURIComponent(q.tema+" PAES")}`;
  return<div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.65)",backdropFilter:"blur(6px)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
    <div style={{width:"100%",maxWidth:440,background:C.card,borderRadius:"28px 28px 0 0",padding:"20px 20px 44px",animation:"slideUp .35s cubic-bezier(.4,0,.2,1)",maxHeight:"92vh",overflowY:"auto"}}>
      <style>{GS}</style>
      <div style={{width:40,height:4,background:C.border,borderRadius:2,margin:"0 auto 18px"}}/>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
        <div style={{width:50,height:50,borderRadius:"50%",background:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"#fff",fontWeight:900,flexShrink:0,animation:ok?"cPop .5s ease":"wWob .4s ease",boxShadow:`0 4px 15px ${col}55`}}>{ok?"✓":"✗"}</div>
        <div><p style={{margin:0,fontSize:16,fontWeight:800,color:col}}>{ok?"¡Correcto! +10 XP 🎉":"Respuesta incorrecta"}</p><p style={{margin:0,fontSize:12,color:C.muted}}>Elige cómo quieres entenderlo</p></div>
      </div>
      <div style={{display:"flex",gap:6,background:C.s2,borderRadius:12,padding:4,marginBottom:18}}>
        {[["texto","📝","Explicación"],["video","▶","Video"],["reel","⚡","Personaje IA"]].map(([id,ic,lb])=>(
          <button key={id} onClick={()=>{setTab(id);if(id==="reel")unlockVx();}} style={{flex:1,padding:"9px 4px",background:tab===id?(id==="reel"?"linear-gradient(135deg,#1a0533,#0d1b4b)":id==="video"?C.bad:C.accent):"none",border:"none",borderRadius:9,color:tab===id?"#fff":C.muted,fontSize:11,fontWeight:tab===id?800:500,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
            <span style={{fontSize:15}}>{ic}</span>{lb}
          </button>
        ))}
      </div>
      {tab==="texto"&&<div style={{background:ok?C.oL:C.bL,border:`1px solid ${col}33`,borderRadius:14,padding:16}}><p style={{margin:0,fontSize:14,color:C.text,lineHeight:1.85}}>{!ok&&<strong style={{color:C.bad}}>¿Por qué fallaste? </strong>}{exp}</p><div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`,display:"flex",gap:8,flexWrap:"wrap"}}><Tag text={q.tema} color={mC(mat)} bg={mB(mat)}/><Tag text={q.dif} color={q.dif==="Alta"?C.bad:q.dif==="Media"?C.warn:C.ok} sm/></div></div>}
      {tab==="video"&&<div><p style={{fontSize:13,color:C.sub,margin:"0 0 12px"}}>Busca <strong>"{q.tema} PAES"</strong> en:</p><a href={yt} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:12,background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"13px 16px",color:C.text}}><div style={{width:40,height:40,borderRadius:12,background:C.bad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#fff",flexShrink:0}}>▶</div><div style={{flex:1}}><p style={{margin:0,fontSize:14,fontWeight:700}}>YouTube</p><p style={{margin:0,fontSize:11,color:C.muted}}>Videos paso a paso</p></div><span style={{color:C.muted}}>↗</span></a></div>}
      {tab==="reel"&&<SpeakingChar q={q}/>}
      <button onClick={onNext} style={{width:"100%",marginTop:16,padding:15,background:ok?C.ok:C.accent,border:"none",borderRadius:14,color:"#fff",fontSize:15,fontWeight:900,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{isLast?"Ver resultado →":"Siguiente pregunta →"}</button>
    </div>
  </div>;
}

function Quiz({questions,materiaId,titulo,onBack,onDone,isDiag}){
  const[sQ]=useState(()=>shuffle(questions));
  const[idx,setIdx]=useState(0),[sel,setSel]=useState(null),[modal,setModal]=useState(false),[res,setRes]=useState([]);
  const col=mC(materiaId),q=sQ[idx],pct=((idx+(sel!==null?1:0))/sQ.length)*100;
  const pick=i=>{if(sel!==null)return;unlockVx();setSel(i);setModal(true);setRes(r=>[...r,{ok:i===q.ok,tema:q.tema,dif:q.dif,src:q.src}]);};
  const next=()=>{setModal(false);if(idx+1>=sQ.length){onDone(res);return;}setIdx(n=>n+1);setSel(null);};
  return<div style={{minHeight:"100vh",background:C.bg}}>
    <style>{GS}</style>
    <div style={{background:C.s1,borderBottom:`1px solid ${C.border}`,padding:"14px 20px",position:"sticky",top:0,zIndex:10}}>
      <div style={{maxWidth:440,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
          <button onClick={onBack} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:10,width:36,height:36,color:C.sub,cursor:"pointer",fontSize:16,flexShrink:0}}>←</button>
          <div style={{flex:1}}><p style={{margin:0,fontSize:13,color:col,fontWeight:700}}>{isDiag?"🧬 ":""}{titulo}</p></div>
          <div style={{background:mB(materiaId),borderRadius:10,padding:"4px 10px"}}><span style={{fontSize:13,fontWeight:800,color:col}}>{idx+1}/{sQ.length}</span></div>
        </div><Bar pct={pct} color={col} h={5}/>
      </div>
    </div>
    <div style={{maxWidth:440,margin:"0 auto",padding:"22px 20px 40px",animation:"fadeUp .3s ease"}}>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}><Tag text={q.src} color={col} bg={mB(materiaId)}/><Tag text={q.dif} color={q.dif==="Alta"?C.bad:q.dif==="Media"?C.warn:C.ok} bg={q.dif==="Alta"?C.bL:q.dif==="Media"?C.wL:C.oL} sm/><Tag text={q.tema} color={C.purple} bg={C.pL} sm/></div>
      <p style={{fontSize:15,lineHeight:1.9,color:C.text,margin:"0 0 24px",whiteSpace:"pre-wrap",fontWeight:500}}>{q.q}</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.ops.map((op,i)=>{const isOk=sel!==null&&i===q.ok,isBad=sel!==null&&i===sel&&i!==q.ok,isDim=sel!==null&&!isOk&&!isBad;return<button key={i} onClick={()=>pick(i)} style={{background:isOk?C.oL:isBad?C.bL:C.card,border:`2px solid ${isOk?C.ok:isBad?C.bad:C.border}`,borderRadius:14,padding:"14px 18px",textAlign:"left",cursor:sel!==null?"default":"pointer",fontSize:14,lineHeight:1.5,color:C.text,outline:"none",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .2s",opacity:isDim?.4:1,animation:isOk?"cPop .4s ease":isBad?"wWob .35s ease":"none"}}>
          <span style={{fontWeight:800,marginRight:8,color:isOk?C.ok:isBad?C.bad:C.sub}}>{op.charAt(0)}</span>{op.slice(1)}
          {isOk&&<span style={{float:"right",color:C.ok,fontWeight:700}}>✓</span>}{isBad&&<span style={{float:"right",color:C.bad,fontWeight:700}}>✗</span>}
        </button>;})}
      </div>
    </div>
    {modal&&<CorreccionModal q={q} sel={sel} onNext={next} isLast={idx+1>=sQ.length} mat={materiaId}/>}
  </div>;
}

function Resultado({resultados,onHome}){
  const tot=resultados.length,ok=resultados.filter(r=>r.ok).length,pct=Math.round(ok/tot*100);
  const col=pct>=70?C.ok:pct>=40?C.warn:C.bad,colL=pct>=70?C.oL:pct>=40?C.wL:C.bL;
  const deb=[...new Set(resultados.filter(r=>!r.ok).map(r=>r.tema))];
  return<div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 24px"}}>
    <style>{GS}</style>
    <div style={{width:"100%",maxWidth:400,animation:"popIn .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:22}}>
        <div style={{width:120,height:120,borderRadius:"50%",background:colL,border:`4px solid ${col}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:`0 8px 30px ${col}33`}}>
          <span style={{fontSize:38,fontWeight:900,color:col,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{pct}%</span><span style={{fontSize:11,color:C.muted}}>puntaje</span>
        </div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,color:C.text,margin:"0 0 6px"}}>{ok} de {tot} correctas</h2>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.gL,border:`1px solid ${C.gold}44`,borderRadius:20,padding:"5px 14px"}}><span>⚡</span><span style={{fontSize:13,fontWeight:800,color:C.gold}}>{ok*10} XP</span></div>
      </div>
      {deb.length>0&&<div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:16,marginBottom:16}}><p style={{margin:"0 0 10px",fontSize:13,fontWeight:800,color:C.warn}}>⚠ Temas para reforzar:</p><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{deb.map((t,i)=><Tag key={i} text={t} color={C.warn} bg={C.wL}/>)}</div></div>}
      <div style={{display:"flex",gap:10}}>
        <button onClick={onHome} style={{flex:1,padding:13,background:C.s2,border:`1px solid ${C.border}`,borderRadius:12,color:C.sub,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>← Inicio</button>
        <button onClick={onHome} style={{flex:2,padding:14,background:C.accent,border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:900,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Seguir practicando →</button>
      </div>
    </div>
  </div>;
}

function getPlan(b,h=2){const f=parseInt(h)>=4?1.5:parseInt(h)>=3?1.2:1;if(b<=0)return{e:"🎉",t:"¡Ya cumples!",d:5,s:1,msg:"Mantén el ritmo."};if(b<=50)return{e:"🎯",t:"Estás muy cerca",d:Math.round(12*f),s:1,msg:`Solo ${b} pts. En semanas llegas.`};if(b<=120)return{e:"🔥",t:"Meta alcanzable",d:Math.round(22*f),s:2,msg:`${b} pts de brecha. 2-3 meses de trabajo.`};return{e:"🚀",t:"Meta exigente",d:Math.round(38*f),s:3,msg:`Son ${b} pts pero el esfuerzo los mueve.`};}

function PerfilAcademico({user,onSave,onBack}){
  const[step,setStep]=useState("datos"),[showW,setShowW]=useState(false);
  const[d,setD]=useState({nem:user.academico?.nem||"",m1:user.academico?.m1||"",ci:user.academico?.ci||"",carrera:user.academico?.carrera||"",horas:"2"});
  const sd=(k,v)=>setD(p=>({...p,[k]:v}));
  const car=CARRERAS.find(c=>c.id===d.carrera);
  const pA=Math.round((parseInt(d.m1)||400)*0.4+(parseInt(d.ci)||400)*0.4+(((parseFloat(d.nem)||4)-4)/3.8*600+150)*0.2);
  const br=car?Math.max(0,car.pts-pA):0,plan=getPlan(br,d.horas);
  const fs={width:"100%",padding:"11px 14px",background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif"};
  if(showW&&car)return<Wrapped user={{...user,academico:d}} car={car} pA={pA} pO={car.pts} plan={plan} onDone={()=>onSave({...user,academico:d})}/>;
  return<div style={{minHeight:"100vh",background:C.bg,paddingBottom:40}}>
    <style>{GS}</style>
    <Topbar title="Perfil Académico" sub="Plan personalizado" onBack={onBack}/>
    <div style={{maxWidth:440,margin:"0 auto",padding:"20px 20px 0"}}>
      {step==="datos"&&<div style={{animation:"fadeUp .3s ease"}}>
        <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:18,marginBottom:14}}>
          <p style={{margin:"0 0 14px",fontSize:14,fontWeight:800,color:C.text}}>📋 Tus calificaciones</p>
          {[["NEM (1.0–7.0)","nem","Ej: 5.8"],["Puntaje PAES M1","m1","Ej: 580"],["Puntaje PAES Ciencias","ci","Ej: 550"]].map(([lb,k,ph])=>(
            <div key={k} style={{marginBottom:11}}><p style={{fontSize:11,color:C.sub,fontWeight:600,margin:"0 0 4px"}}>{lb}</p><input value={d[k]} onChange={e=>sd(k,e.target.value)} placeholder={ph} type="number" style={fs}/></div>
          ))}
          <div style={{marginBottom:11}}><p style={{fontSize:11,color:C.sub,fontWeight:600,margin:"0 0 4px"}}>Horas de estudio al día</p><select value={d.horas} onChange={e=>sd("horas",e.target.value)} style={{...fs,appearance:"auto"}}>{["1","2","3","4","5+"].map(o=><option key={o} value={o}>{o} hora{o!=="1"?"s":""}</option>)}</select></div>
        </div>
        <button onClick={()=>setStep("objetivo")} style={{width:"100%",padding:14,background:C.accent,border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Continuar →</button>
      </div>}
      {step==="objetivo"&&<div style={{animation:"fadeUp .3s ease"}}>
        <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:18,marginBottom:14}}>
          <p style={{margin:"0 0 14px",fontSize:14,fontWeight:800,color:C.text}}>🎓 Tu carrera objetivo</p>
          <select value={d.carrera} onChange={e=>sd("carrera",e.target.value)} style={{...fs,appearance:"auto"}}>
            <option value="">Selecciona carrera...</option>
            {CARRERAS.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label} — {c.pts} pts</option>)}
          </select>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setStep("datos")} style={{flex:1,padding:13,background:C.s2,border:`1px solid ${C.border}`,borderRadius:12,color:C.sub,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>← Volver</button>
          <button onClick={()=>{onSave({...user,academico:d});setStep("resultado");}} disabled={!d.carrera} style={{flex:2,padding:14,background:d.carrera?C.accent:C.border,border:"none",borderRadius:12,color:d.carrera?"#fff":C.muted,fontSize:14,fontWeight:800,cursor:d.carrera?"pointer":"default",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Ver mi plan →</button>
        </div>
      </div>}
      {step==="resultado"&&car&&<div style={{animation:"fadeUp .3s ease"}}>
        <div style={{background:`linear-gradient(135deg,${C.aL},#F0F7FF)`,borderRadius:16,border:`1.5px solid ${C.accent}22`,padding:18,marginBottom:14}}>
          <p style={{margin:"0 0 12px",fontSize:14,fontWeight:800,color:C.text}}>🎯 {car.icon} {car.label}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            <div style={{textAlign:"center",background:C.card,borderRadius:12,padding:14}}><p style={{margin:0,fontSize:11,color:C.muted}}>Tu puntaje</p><p style={{margin:"4px 0 0",fontSize:28,fontWeight:900,color:C.accent,fontFamily:"'Syne',sans-serif"}}>{pA}</p></div>
            <div style={{textAlign:"center",background:C.card,borderRadius:12,padding:14}}><p style={{margin:0,fontSize:11,color:C.muted}}>Necesitas</p><p style={{margin:"4px 0 0",fontSize:28,fontWeight:900,color:C.gold,fontFamily:"'Syne',sans-serif"}}>{car.pts}</p></div>
          </div>
          <Bar pct={Math.min(100,Math.round(pA/car.pts*100))} color={br===0?C.ok:C.accent} h={8}/>
          <p style={{margin:"6px 0 0",fontSize:11,color:C.sub}}>{br===0?"¡Meta cumplida! 🎉":`Te faltan ${br} puntos`}</p>
        </div>
        <div style={{background:br<=50?C.oL:br<=120?C.aL:C.wL,borderRadius:16,border:`1px solid ${C.border}`,padding:18,marginBottom:14}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}><span style={{fontSize:24}}>{plan.e}</span><div><p style={{margin:0,fontSize:14,fontWeight:800,color:C.text}}>{plan.t}</p><p style={{margin:0,fontSize:11,color:C.sub}}>Plan solo para ti</p></div></div>
          <p style={{margin:"0 0 12px",fontSize:13,color:C.text,lineHeight:1.6}}>{plan.msg}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[["📝",plan.d,"preguntas/día"],["📋",plan.s,"ensayos/sem"],["⏱️",d.horas,"horas/día"],["🗓️","2026","año PAES"]].map(([ic,v,lb],i)=><div key={i} style={{background:C.card,borderRadius:10,padding:"10px 12px",textAlign:"center"}}><div style={{fontSize:16}}>{ic}</div><div style={{fontSize:18,fontWeight:900,color:C.accent,fontFamily:"'Syne',sans-serif"}}>{v}</div><div style={{fontSize:10,color:C.muted}}>{lb}</div></div>)}</div>
        </div>
        <button onClick={()=>{unlockVx();setShowW(true);}} style={{width:"100%",padding:18,background:"linear-gradient(135deg,#1a0533,#0d1b4b)",border:"2px solid rgba(255,255,255,.15)",borderRadius:16,color:"#fff",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:"0 8px 30px rgba(79,70,229,.4)",display:"flex",alignItems:"center",justifyContent:"center",gap:14}}>
          <span style={{fontSize:28,animation:"float 2s ease-in-out infinite"}}>🎯</span>
          <div style={{textAlign:"left"}}><p style={{margin:0,fontSize:15,fontWeight:900}}>Ver resumen con animación</p><p style={{margin:0,fontSize:12,color:"rgba(255,255,255,.6)"}}>Voz real · estilo Spotify Wrapped ✨</p></div>
        </button>
      </div>}
    </div>
  </div>;
}

function Home({user,onSelect}){
  const isA=user.rol==="admin",isP=isA||user.rol==="premium";
  const car=CARRERAS.find(c=>c.id===user.academico?.carrera);
  const pA=user.academico?Math.round((parseInt(user.academico.m1)||400)*0.4+(parseInt(user.academico.ci)||400)*0.4+(((parseFloat(user.academico.nem)||4)-4)/3.8*600+150)*0.2):0;
  const plan=user.academico&&car?getPlan(Math.max(0,car.pts-pA),user.academico.horas):null;
  const reto=plan?plan.d:10;
  return<div style={{minHeight:"100vh",background:C.bg,paddingBottom:80}}>
    <style>{GS}</style>
    <div style={{background:C.s1,borderBottom:`1px solid ${C.border}`,padding:"16px 20px"}}>
      <div style={{maxWidth:440,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>onSelect("perfil")} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:isA?C.gL:C.aL,border:`2px solid ${isA?C.gold:C.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,animation:"float 4s ease-in-out infinite"}}>{user.emoji}</div>
          <div style={{textAlign:"left"}}><p style={{margin:0,fontSize:13,fontWeight:700,color:C.text}}>{user.nick}</p><p style={{margin:0,fontSize:11,color:C.sub}}>{isA?"👑 Admin":isP?"⭐ Premium":"Free"}</p></div>
        </button>
        <h1 style={{fontFamily:"'Syne',sans-serif",margin:0,fontSize:22,fontWeight:900,color:C.text,letterSpacing:-.5}}>PAES<span style={{color:C.accent}}>·AI</span></h1>
      </div>
    </div>
    <div style={{maxWidth:440,margin:"0 auto",padding:"18px 20px 0"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
        {[["🔥",user.stats.racha||0,"Racha"],["⚡",user.stats.xp||0,"XP"],["✅",user.stats.oks||0,"Correctas"]].map(([ic,v,lb],i)=>(
          <div key={i} style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:"12px 8px",textAlign:"center",animation:`fadeUp ${.2+i*.08}s ease`}}>
            <div style={{fontSize:16}}>{ic}</div><div style={{fontSize:20,fontWeight:900,color:C.text,fontFamily:"'Syne',sans-serif",lineHeight:1.2}}>{v}</div><div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:.5}}>{lb}</div>
          </div>
        ))}
      </div>
      <div style={{background:`linear-gradient(135deg,${C.purple}15,${C.aL})`,borderRadius:16,border:`1.5px solid ${C.purple}33`,padding:18,marginBottom:14,cursor:"pointer",animation:"fadeUp .3s ease"}} onClick={()=>onSelect("m1")}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:52,height:52,borderRadius:16,background:C.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,boxShadow:`0 4px 12px ${C.purple}44`,animation:"float 3s ease-in-out infinite"}}>⚡</div>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:11,fontWeight:700,color:C.purple,letterSpacing:.5,textTransform:"uppercase"}}>Reto diario{plan?` · ${plan.t}`:""}</p>
            <p style={{margin:"2px 0 0",fontSize:15,fontWeight:800,color:C.text}}>Responde {reto} preguntas hoy</p>
            <p style={{margin:"2px 0 0",fontSize:12,color:C.sub}}>{car?`Para llegar a ${car.label} ${car.icon}`:"Define tu carrera →"}</p>
          </div>
          <div style={{background:C.purple,borderRadius:10,padding:"6px 12px"}}><span style={{fontSize:12,fontWeight:800,color:"#fff"}}>Ir →</span></div>
        </div>
        <div style={{marginTop:12}}><Bar pct={Math.min(100,Math.round((user.stats.oks%Math.max(1,reto))/reto*100))} color={C.purple} h={5}/><p style={{margin:"4px 0 0",fontSize:10,color:C.muted}}>{user.stats.oks%Math.max(1,reto)}/{reto} hoy</p></div>
      </div>
      <div style={{background:car?`linear-gradient(135deg,${C.aL},#F0F7FF)`:C.s2,borderRadius:16,border:`1.5px solid ${car?C.accent+"22":C.border}`,padding:16,marginBottom:14,cursor:"pointer",animation:"fadeUp .35s ease"}} onClick={()=>onSelect("perfilAcademico")}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28,animation:"float 4s ease-in-out .5s infinite"}}>🎓</span>
          <div style={{flex:1}}>{car?<><p style={{margin:0,fontSize:13,fontWeight:800,color:C.text}}>{car.icon} {car.label}</p><p style={{margin:"2px 0 0",fontSize:11,color:C.sub}}>Ver mi plan →</p></>:<><p style={{margin:0,fontSize:13,fontWeight:800,color:C.text}}>Define tu carrera objetivo</p><p style={{margin:"2px 0 0",fontSize:11,color:C.sub}}>Plan + animación Wrapped →</p></>}</div>
          <span style={{color:C.accent,fontSize:18}}>›</span>
        </div>
      </div>
      {!user.diagDone&&<div style={{background:"linear-gradient(135deg,#F5F3FF,#EFF4FF)",borderRadius:16,border:`1.5px solid ${C.purple}33`,padding:"14px 16px",marginBottom:14,cursor:"pointer",animation:"fadeUp .4s ease"}} onClick={()=>onSelect("diagnostico")}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontSize:28,animation:"float 2s ease-in-out infinite"}}>🧬</div>
          <div style={{flex:1}}><p style={{margin:0,fontSize:14,fontWeight:800,color:C.text}}>Diagnóstico inicial</p><p style={{margin:"2px 0 0",fontSize:12,color:C.sub}}>Detecta tus puntos débiles</p></div>
          <div style={{background:C.purple,borderRadius:10,padding:"6px 12px"}}><span style={{fontSize:12,fontWeight:800,color:"#fff"}}>Hacer →</span></div>
        </div>
      </div>}
      <p style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase",margin:"0 0 10px"}}>Materias</p>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {MATERIAS.map((m,i)=>{
          const locked=!m.on||(!isP&&i>0),col=mC(m.id),bg=mB(m.id),qc=QS[m.id]?.length||0;
          return<div key={m.id} style={{background:C.card,borderRadius:16,border:locked?`1px solid ${C.border}`:`1.5px solid ${col}22`,padding:"13px 16px",opacity:!m.on?.5:1,cursor:locked?"default":"pointer",animation:`fadeUp ${.45+i*.07}s ease`}} onClick={()=>!locked&&onSelect(m.id)}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:46,height:46,borderRadius:14,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{m.icon}</div>
              <div style={{flex:1}}><p style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{m.label}</p><p style={{margin:"2px 0 0",fontSize:11,color:C.sub}}>{m.sub}</p></div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                {m.on&&<Tag text={qc+" Qs"} color={col} bg={bg} sm/>}
                {!m.on&&<Tag text="Pronto" color={C.muted} sm/>}
                {m.on&&locked&&<Tag text="🔒" color={C.gold} bg={C.gL} sm/>}
                {m.on&&!locked&&<span style={{color:C.muted,fontSize:18}}>›</span>}
              </div>
            </div>
          </div>;
        })}
      </div>
      {!isP&&<div style={{marginTop:14,background:C.gL,borderRadius:16,border:`1.5px solid ${C.gold}44`,padding:18,textAlign:"center",animation:"fadeUp .7s ease"}}>
        <p style={{margin:"0 0 4px",fontSize:14,fontWeight:800,color:C.gold}}>🌟 Desbloquea Premium</p>
        <p style={{margin:"0 0 12px",fontSize:12,color:C.sub}}>Todas las materias · IA ilimitada · $3.990/mes</p>
        <button onClick={()=>onSelect("webpay")} style={{background:"#E8192C",border:"none",borderRadius:10,padding:"11px 22px",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",display:"flex",alignItems:"center",gap:8,margin:"0 auto"}}>💳 WebPay Plus</button>
      </div>}
      {isA&&<button onClick={()=>onSelect("admin")} style={{width:"100%",marginTop:12,padding:12,background:C.gL,border:`1.5px solid ${C.gold}55`,borderRadius:12,color:C.gold,fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>👑 Panel Admin</button>}
    </div>
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.s1,borderTop:`1px solid ${C.border}`,boxShadow:"0 -4px 12px rgba(0,0,0,.06)",padding:"10px 0 12px",zIndex:20}}>
      <div style={{maxWidth:440,margin:"0 auto",display:"flex"}}>
        {[["🏠","Inicio","home"],["🏆","Ranking","ranking"],["📉","Errores","historial"],["👤","Perfil","perfil"]].map(([ic,lb,dest])=>(
          <button key={dest} onClick={()=>onSelect(dest)} style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"6px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:20}}>{ic}</span><span style={{fontSize:10,fontWeight:600,color:C.muted}}>{lb}</span>
          </button>
        ))}
      </div>
    </div>
  </div>;
}

function MateriaDetail({materiaId,onBack,onStartQuiz}){
  const col=mC(materiaId),bg=mB(materiaId),mat={m1:"Matemática M1",ciencias:"Ciencias"}[materiaId],allQ=QS[materiaId]||[];
  return<div style={{minHeight:"100vh",background:C.bg,paddingBottom:40}}>
    <style>{GS}</style>
    <Topbar title={mat} sub={`${allQ.length} preguntas · aleatorias`} onBack={onBack}/>
    <div style={{maxWidth:440,margin:"0 auto",padding:"20px 20px 0"}}>
      {[{bg,bc:col,ic:"📋",t:"Ensayo general",s:`${allQ.length} preguntas`,fn:()=>onStartQuiz(allQ,materiaId,mat+" · Ensayo",false)},{bg:C.pL,bc:C.purple,ic:"🧬",t:"Diagnóstico",s:"Detecta puntos débiles",fn:()=>onStartQuiz(allQ,materiaId,mat+" · Diagnóstico",true)}].map((o,i)=>(
        <div key={i} style={{background:o.bg,borderRadius:16,border:`1.5px solid ${o.bc}33`,padding:18,marginBottom:12,cursor:"pointer",animation:`fadeUp ${.2+i*.1}s ease`}} onClick={o.fn}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:50,height:50,borderRadius:16,background:C.card,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,animation:"float 3s ease-in-out infinite"}}>{o.ic}</div>
            <div style={{flex:1}}><p style={{margin:0,fontSize:15,fontWeight:800,color:C.text}}>{o.t}</p><p style={{margin:"2px 0 0",fontSize:12,color:C.sub}}>{o.s}</p></div>
            <div style={{background:o.bc,borderRadius:10,padding:"6px 12px"}}><span style={{fontSize:12,fontWeight:800,color:"#fff"}}>Iniciar →</span></div>
          </div>
        </div>
      ))}
    </div>
  </div>;
}

function SimpleScreen({title,emoji,children,onBack}){return<div style={{minHeight:"100vh",background:C.bg,paddingBottom:40}}><style>{GS}</style><Topbar title={title} onBack={onBack}/><div style={{maxWidth:440,margin:"0 auto",padding:"20px 20px 0"}}>{children}</div></div>;}

function Perfil({user,onBack,onLogout,onUpdateUser,onWebpay,onAcad}){
  const[ed,setEd]=useState(false),[nick,setNick]=useState(user.nick),[emoji,setEmoji]=useState(user.emoji);
  const emojis=["🎯","🔥","💪","🧠","⚡","🚀","🏆","👑","🦁","😎"];
  const car=CARRERAS.find(c=>c.id===user.academico?.carrera);
  return<SimpleScreen title="Mi perfil" onBack={onBack}>
    <div style={{textAlign:"center",marginBottom:20}}>
      <div style={{width:80,height:80,borderRadius:"50%",background:C.aL,border:`3px solid ${C.accent}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,margin:"0 auto 12px",animation:"float 4s ease-in-out infinite"}}>{emoji}</div>
      {ed?<>
        <input value={nick} onChange={e=>setNick(e.target.value.slice(0,20))} style={{textAlign:"center",fontSize:18,fontWeight:800,color:C.text,background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"7px 14px",width:"100%",maxWidth:240,marginBottom:8,fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:10}}>{emojis.map(em=><button key={em} onClick={()=>setEmoji(em)} style={{width:40,height:40,borderRadius:10,fontSize:20,background:emoji===em?C.aL:C.s2,border:`2px solid ${emoji===em?C.accent:C.border}`,cursor:"pointer"}}>{em}</button>)}</div>
        <button onClick={()=>{onUpdateUser({...user,nick,emoji});setEd(false);}} style={{background:C.accent,border:"none",borderRadius:10,padding:"9px 22px",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",marginRight:8}}>Guardar</button>
        <button onClick={()=>setEd(false)} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 18px",color:C.sub,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancelar</button>
      </>:<>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:900,color:C.text,margin:"0 0 4px"}}>{nick}</h2>
        <p style={{fontSize:12,color:C.sub,margin:"0 0 8px"}}>{user.colegio||"Sin establecimiento"}</p>
        <button onClick={()=>setEd(true)} style={{background:C.s2,border:`1px solid ${C.border}`,borderRadius:10,padding:"6px 16px",color:C.sub,fontSize:12,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Editar perfil</button>
      </>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {[["📋",user.stats.ensayos||0,"Ensayos",C.accent,C.aL],["✅",user.stats.oks||0,"Correctas",C.ok,C.oL],["🔥",user.stats.racha||0,"Racha",C.bad,C.bL],["⚡",user.stats.xp||0,"XP",C.gold,C.gL]].map(([ic,v,lb,co,bg],i)=>(
        <div key={i} style={{background:bg,borderRadius:16,border:`1px solid ${co}22`,padding:14}}><div style={{fontSize:18,marginBottom:4}}>{ic}</div><div style={{fontSize:22,fontWeight:900,color:co,fontFamily:"'Syne',sans-serif"}}>{v}</div><div style={{fontSize:10,color:co,fontWeight:600,opacity:.8}}>{lb}</div></div>
      ))}
    </div>
    <div style={{background:C.aL,borderRadius:16,border:`1.5px solid ${C.accent}22`,padding:16,marginBottom:14,cursor:"pointer"}} onClick={onAcad}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:26}}>🎓</span>
        <div style={{flex:1}}>{car?<><p style={{margin:0,fontSize:13,fontWeight:800,color:C.text}}>{car.icon} {car.label}</p><p style={{margin:"2px 0 0",fontSize:11,color:C.sub}}>Ver mi plan →</p></>:<><p style={{margin:0,fontSize:13,fontWeight:800,color:C.text}}>Configura tu carrera objetivo</p><p style={{margin:"2px 0 0",fontSize:11,color:C.sub}}>Plan personalizado →</p></>}</div>
        <span style={{color:C.accent,fontSize:18}}>›</span>
      </div>
    </div>
    {user.rol!=="admin"&&user.rol!=="premium"&&<div style={{background:C.gL,borderRadius:16,border:`1.5px solid ${C.gold}44`,padding:18,marginBottom:14,textAlign:"center"}}>
      <p style={{margin:"0 0 4px",fontSize:14,fontWeight:800,color:C.gold}}>🌟 Hazte Premium</p>
      <p style={{margin:"0 0 12px",fontSize:13,color:C.sub}}>Todas las materias · $3.990/mes</p>
      <button onClick={onWebpay} style={{background:"#E8192C",border:"none",borderRadius:10,padding:"11px 22px",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",display:"flex",alignItems:"center",gap:8,margin:"0 auto"}}>💳 WebPay Plus</button>
    </div>}
    <button onClick={onLogout} style={{width:"100%",padding:13,background:C.bL,border:`1.5px solid ${C.bad}33`,borderRadius:12,color:C.bad,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>🚪 Cerrar sesión</button>
  </SimpleScreen>;
}

function Historial({user,onBack}){
  const err=user.historial||[],por={};
  err.forEach(e=>{if(!por[e.tema])por[e.tema]={tema:e.tema,count:0};por[e.tema].count++;});
  const lista=Object.values(por).sort((a,b)=>b.count-a.count);
  return<SimpleScreen title="Historial de errores" onBack={onBack}>
    {lista.length===0?<div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:40,textAlign:"center"}}><div style={{fontSize:48,marginBottom:12,animation:"float 2s ease-in-out infinite"}}>🎯</div><p style={{fontSize:15,fontWeight:700,color:C.text,margin:"0 0 6px"}}>Sin errores aún</p><p style={{fontSize:13,color:C.muted}}>Haz tu primer ensayo</p></div>:
      lista.map((item,i)=><div key={i} style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:"13px 16px",marginBottom:8}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:40,height:40,borderRadius:12,background:C.bL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{item.count>=5?"😤":item.count>=3?"😟":"🔸"}</div>
          <div style={{flex:1}}><p style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{item.tema}</p></div>
          <div style={{background:C.bL,border:`1px solid ${C.bad}33`,borderRadius:8,padding:"4px 10px",textAlign:"center"}}><span style={{fontSize:16,fontWeight:900,color:C.bad}}>{item.count}</span><span style={{fontSize:10,color:C.bad,display:"block"}}>errores</span></div>
        </div>
        <div style={{marginTop:8}}><Bar pct={Math.min(100,item.count*20)} color={item.count>=5?C.bad:item.count>=3?C.warn:C.gold} h={4}/></div>
      </div>)}
  </SimpleScreen>;
}

function Ranking({user,onBack}){
  const[cp,setCp]=useState(false);
  return<SimpleScreen title="Ranking" onBack={onBack}>
    <div style={{background:`linear-gradient(135deg,${C.aL},#F0F7FF)`,borderRadius:16,border:`1.5px solid ${C.accent}22`,padding:16,marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:C.aL,border:`3px solid ${C.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{user.emoji}</div>
        <div style={{flex:1}}><p style={{margin:0,fontSize:14,fontWeight:800,color:C.text}}>{user.nick}</p><p style={{margin:"2px 0 0",fontSize:11,color:C.sub}}>⚡{user.stats.xp} XP · 🔥{user.stats.racha}d</p></div>
        <div style={{background:C.accent,borderRadius:12,padding:"8px 14px",textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:"#fff",fontFamily:"'Syne',sans-serif"}}>1°</div></div>
      </div>
    </div>
    <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:16,marginBottom:14}}>
      <p style={{margin:"0 0 8px",fontSize:13,fontWeight:700,color:C.text}}>Tu ID para compartir</p>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{flex:1,background:C.s2,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",fontFamily:"monospace",fontSize:14,fontWeight:700,color:C.accent}}>{user.uid}</div>
        <button onClick={()=>{setCp(true);setTimeout(()=>setCp(false),2000);}} style={{background:cp?C.ok:C.accent,border:"none",borderRadius:10,padding:"10px 14px",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",flexShrink:0}}>{cp?"✓":"Copiar"}</button>
      </div>
    </div>
    <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:36,textAlign:"center"}}><div style={{fontSize:48,marginBottom:12,animation:"float 3s ease-in-out infinite"}}>🏆</div><p style={{fontSize:15,fontWeight:800,color:C.text,margin:"0 0 8px"}}>Eres el 1° en la lista</p><p style={{fontSize:13,color:C.sub,lineHeight:1.6}}>Comparte tu ID para que tus compañeros puedan desafiarte</p></div>
  </SimpleScreen>;
}

function AdminPanel({user,onBack}){
  return<SimpleScreen title="👑 Panel Admin" onBack={onBack}>
    <div style={{background:C.oL,borderRadius:16,border:`1px solid ${C.ok}33`,padding:12,marginBottom:14}}><p style={{margin:0,fontSize:12,color:C.ok,fontWeight:600}}>✅ Firebase conectado · paes-ai-5d901</p></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {[["🔥",user.stats.racha||1,"Racha",C.bad,C.bL],["⚡",user.stats.xp||0,"XP",C.gold,C.gL],["✅",user.stats.oks||0,"Correctas",C.ok,C.oL],["📝",Object.values(QS).flat().length,"Preguntas",C.purple,C.pL]].map(([ic,v,lb,co,bg],i)=>(
        <div key={i} style={{background:bg,borderRadius:16,border:`1px solid ${co}22`,padding:14}}><div style={{fontSize:20,marginBottom:4}}>{ic}</div><div style={{fontSize:24,fontWeight:900,color:co,fontFamily:"'Syne',sans-serif"}}>{v}</div><div style={{fontSize:10,color:co,fontWeight:600,opacity:.8}}>{lb}</div></div>
      ))}
    </div>
    <div style={{background:C.aL,borderRadius:16,border:`1px solid ${C.accent}22`,padding:16}}>
      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:700,color:C.accent}}>🚀 Para lanzar</p>
      {[["Cuenta Flow/WebPay (necesita adulto)","~1 día"],["Publicar en Vercel","~10 min"]].map(([t,d],i)=>(
        <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<1?`1px solid ${C.border}`:"none"}}>
          <span style={{fontSize:13,color:C.text}}>○ {t}</span><span style={{fontSize:11,color:C.muted,background:C.s2,borderRadius:6,padding:"2px 8px"}}>{d}</span>
        </div>
      ))}
    </div>
  </SimpleScreen>;
}

function WebpayModal({onClose,onSuccess}){
  const[step,setStep]=useState("plan"),[card,setCard]=useState({num:"",name:"",exp:"",cvv:""}),[err,setErr]=useState(""),[prog,setProg]=useState(0);
  const fc=v=>v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fe=v=>v.replace(/\D/g,"").slice(0,4).replace(/(.{2})/,"$1/");
  const pay=()=>{
    if(card.num.replace(/\s/g,"").length<16){setErr("Número incompleto");return;}
    if(!card.name.trim()){setErr("Ingresa el nombre");return;}
    if(card.exp.length<5){setErr("Fecha inválida");return;}
    if(card.cvv.length<3){setErr("CVV inválido");return;}
    setErr("");setStep("proc");let p=0;const iv=setInterval(()=>{p+=Math.random()*18;if(p>=100){p=100;clearInterval(iv);setStep("ok");}setProg(Math.min(100,p));},280);
  };
  return<div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.75)",backdropFilter:"blur(6px)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
    <style>{GS}</style>
    <div style={{width:"100%",maxWidth:400,background:C.card,borderRadius:20,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,.3)",animation:"popIn .35s ease"}}>
      <div style={{background:"#E8192C",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div><p style={{margin:0,fontSize:10,color:"rgba(255,255,255,.8)",fontWeight:600,letterSpacing:1}}>TRANSBANK</p><p style={{margin:0,fontSize:20,fontWeight:900,color:"#fff",fontFamily:"'Syne',sans-serif"}}>WebPay Plus</p></div>
        <button onClick={onClose} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,width:32,height:32,color:"#fff",cursor:"pointer",fontSize:16}}>✕</button>
      </div>
      <div style={{padding:"20px"}}>
        {step==="plan"&&<div><div style={{background:C.gL,border:`1px solid ${C.gold}44`,borderRadius:14,padding:16,marginBottom:18}}><p style={{margin:"0 0 4px",fontSize:15,fontWeight:800,color:C.gold}}>🌟 Plan Premium</p><p style={{margin:"0 0 12px",fontSize:13,color:C.sub}}>Todas las materias · IA ilimitada</p><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,color:C.sub}}>Monto:</span><span style={{fontSize:18,fontWeight:900,color:C.gold}}>$3.990 CLP</span></div></div><button onClick={()=>setStep("card")} style={{width:"100%",padding:14,background:"#E8192C",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Continuar →</button></div>}
        {step==="card"&&<div>
          <p style={{fontSize:13,fontWeight:700,color:C.text,margin:"0 0 14px"}}>💳 Datos de tu tarjeta</p>
          {[["Número","0000 0000 0000 0000","num","text",fc,19],["Titular","NOMBRE APELLIDO","name","text",v=>v.toUpperCase().slice(0,26),26]].map(([lb,ph,k,t,f,mx])=>(
            <div key={k} style={{marginBottom:11}}><p style={{fontSize:11,color:C.sub,fontWeight:600,margin:"0 0 4px"}}>{lb}</p><input value={card[k]} onChange={e=>setCard(c=>({...c,[k]:f(e.target.value)}))} placeholder={ph} maxLength={mx} type={t} style={{width:"100%",padding:"11px 14px",background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:k==="num"?2:0}}/></div>
          ))}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:11}}>
            {[["Venc.","MM/AA","exp","text",fe,5],["CVV","123","cvv","password",v=>v.replace(/\D/g,"").slice(0,4),4]].map(([lb,ph,k,t,f,mx])=>(
              <div key={k}><p style={{fontSize:11,color:C.sub,fontWeight:600,margin:"0 0 4px"}}>{lb}</p><input value={card[k]} onChange={e=>setCard(c=>({...c,[k]:f(e.target.value)}))} placeholder={ph} maxLength={mx} type={t} style={{width:"100%",padding:"11px 14px",background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif"}}/></div>
            ))}
          </div>
          {err&&<div style={{background:C.bL,border:`1px solid ${C.bad}33`,borderRadius:8,padding:"8px 12px",marginBottom:10}}><p style={{margin:0,fontSize:12,color:C.bad}}>⚠ {err}</p></div>}
          <div style={{background:C.s2,borderRadius:10,padding:"9px 12px",marginBottom:12,display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:16}}>🔒</span><p style={{margin:0,fontSize:11,color:C.muted}}>SSL 256-bit · Transbank Chile</p></div>
          <button onClick={pay} style={{width:"100%",padding:14,background:"#E8192C",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Pagar $3.990 CLP →</button>
          <button onClick={()=>setStep("plan")} style={{width:"100%",marginTop:8,padding:10,background:"none",border:`1px solid ${C.border}`,borderRadius:10,color:C.muted,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>← Volver</button>
        </div>}
        {step==="proc"&&<div style={{textAlign:"center",padding:"24px 0"}}><div style={{fontSize:44,marginBottom:14,animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</div><p style={{fontSize:15,fontWeight:700,color:C.text,margin:"0 0 6px"}}>Procesando...</p><div style={{background:C.border,borderRadius:8,height:8,overflow:"hidden"}}><div style={{height:"100%",width:`${prog}%`,background:"#E8192C",borderRadius:8,transition:"width .3s"}}/></div></div>}
        {step==="ok"&&<div style={{textAlign:"center",padding:"20px 0",animation:"popIn .4s ease"}}><div style={{width:64,height:64,borderRadius:"50%",background:C.oL,border:`3px solid ${C.ok}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 14px"}}>✓</div><p style={{fontSize:18,fontWeight:800,color:C.ok,margin:"0 0 4px"}}>¡Pago exitoso!</p><p style={{fontSize:13,color:C.sub,margin:"0 0 18px"}}>Tu cuenta Premium está activa</p><button onClick={onSuccess} style={{width:"100%",padding:14,background:C.ok,border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>¡Activar Premium! →</button></div>}
      </div>
    </div>
  </div>;
}

function Landing({onNext}){
  return<div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 24px"}}>
    <style>{GS}</style>
    <div style={{width:"100%",maxWidth:400,animation:"fadeUp .6s ease"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:68,marginBottom:14,animation:"float 3s ease-in-out infinite"}}>🎯</div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:44,fontWeight:900,color:C.text,margin:"0 0 8px",letterSpacing:-2}}>PAES<span style={{color:C.accent}}>·AI</span></h1>
        <p style={{color:C.sub,fontSize:15,margin:0}}>El simulacro que te explica<br/><strong style={{color:C.text}}>exactamente por qué fallaste</strong></p>
      </div>
      {[["🧠","Personaje IA que habla y explica tu error"],["🎓","Plan + animación según tu carrera"],["🔀","M1 y Ciencias · preguntas siempre aleatorias"],["🔥","Login real Firebase · datos guardados"]].map(([ic,t],k)=>(
        <div key={k} style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:"11px 16px",marginBottom:8,animation:`fadeUp ${.4+k*.08}s ease`}}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:20}}>{ic}</span><span style={{fontSize:13,color:C.text}}>{t}</span></div></div>
      ))}
      <button onClick={()=>onNext("register")} style={{width:"100%",padding:14,background:C.accent,border:"none",borderRadius:14,color:"#fff",fontSize:16,fontWeight:900,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:10,marginTop:18}}>Crear cuenta gratis →</button>
      <button onClick={()=>onNext("login")} style={{width:"100%",padding:12,background:C.s2,border:`1px solid ${C.border}`,borderRadius:12,color:C.sub,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Ya tengo cuenta</button>
      <button onClick={()=>onNext("adminLogin")} style={{display:"block",margin:"10px auto 0",background:"none",border:"none",color:C.muted,fontSize:12,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>🔐 Admin</button>
    </div>
  </div>;
}

function AuthForm({title,isReg,badge,onSubmit,onGoogle,onBack,loading,err}){
  const[email,setEmail]=useState(""),[pass,setPass]=useState(""),[pass2,setPass2]=useState("");
  const fs={padding:"12px 14px",background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:11,color:C.text,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",width:"100%"};
  const dis=loading||!email||!pass||(isReg&&!pass2);
  return<div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 24px"}}>
    <style>{GS}</style>
    <div style={{width:"100%",maxWidth:400,animation:"fadeUp .5s ease"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.sub,fontSize:14,cursor:"pointer",marginBottom:22,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>← Volver</button>
      {badge&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:18,height:18,borderRadius:"50%",background:C.ok,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",fontWeight:900}}>✓</div><p style={{fontSize:11,color:C.ok,fontWeight:700,margin:0}}>Firebase conectado</p></div>}
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:26,color:C.text,margin:"0 0 18px"}}>{title}</h2>
      <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:14}}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" autoFocus style={fs}/>
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Contraseña" type="password" onKeyDown={e=>!isReg&&e.key==="Enter"&&onSubmit(email,pass,"")} style={fs}/>
        {isReg&&<input value={pass2} onChange={e=>setPass2(e.target.value)} placeholder="Confirmar contraseña" type="password" style={fs}/>}
      </div>
      {err&&<div style={{background:C.bL,border:`1px solid ${C.bad}33`,borderRadius:9,padding:"9px 13px",marginBottom:12,animation:"shake .4s ease"}}><p style={{margin:0,fontSize:12,color:C.bad}}>⚠ {err}</p></div>}
      <button onClick={()=>onSubmit(email,pass,pass2)} disabled={dis} style={{width:"100%",padding:14,background:dis?C.border:C.accent,border:"none",borderRadius:12,color:dis?C.muted:"#fff",fontSize:15,fontWeight:800,cursor:dis?"default":"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        {loading?<span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</span>:isReg?"Crear cuenta →":"Entrar →"}
      </button>
      <div style={{display:"flex",alignItems:"center",gap:12,margin:"14px 0"}}><div style={{flex:1,height:1,background:C.border}}/><span style={{fontSize:11,color:C.muted}}>o</span><div style={{flex:1,height:1,background:C.border}}/></div>
      <button onClick={onGoogle} style={{width:"100%",padding:12,background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:12,color:C.text,fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><span style={{fontSize:18}}>🔵</span> Continuar con Google</button>
    </div>
  </div>;
}

function Nickname({onDone,gName=""}){
  const[nick,setNick]=useState(gName.split(" ")[0]||""),[emoji,setEmoji]=useState("🎯"),[col,setCol]=useState("");
  const emojis=["🎯","🔥","💪","🧠","⚡","🚀","🏆","👑","🦁","😎"];
  return<div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 24px"}}>
    <style>{GS}</style>
    <div style={{width:"100%",maxWidth:400,animation:"popIn .5s ease"}}>
      <div style={{textAlign:"center",margin:"20px 0"}}>
        <div style={{width:78,height:78,borderRadius:"50%",background:C.aL,border:`3px solid ${C.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,margin:"0 auto 12px",animation:"float 3s ease-in-out infinite"}}>{emoji}</div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,color:C.text,margin:"0 0 4px"}}>¿Cómo te llamamos?</h2>
      </div>
      <div style={{marginBottom:11}}><p style={{fontSize:11,color:C.sub,fontWeight:600,margin:"0 0 7px"}}>Avatar</p><div style={{display:"flex",flexWrap:"wrap",gap:7}}>{emojis.map(em=><button key={em} onClick={()=>setEmoji(em)} style={{width:40,height:40,borderRadius:10,fontSize:20,background:emoji===em?C.aL:C.s2,border:`2px solid ${emoji===em?C.accent:C.border}`,cursor:"pointer"}}>{em}</button>)}</div></div>
      <div style={{marginBottom:11}}><p style={{fontSize:11,color:C.sub,fontWeight:600,margin:"0 0 5px"}}>Apodo</p><input value={nick} onChange={e=>setNick(e.target.value.slice(0,20))} placeholder="Ej: MateKing..." autoFocus style={{width:"100%",padding:"12px 14px",background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:11,color:C.text,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif"}}/></div>
      <div style={{marginBottom:20}}><p style={{fontSize:11,color:C.sub,fontWeight:600,margin:"0 0 5px"}}>Establecimiento <span style={{color:C.muted,fontWeight:400}}>(opcional)</span></p><input value={col} onChange={e=>setCol(e.target.value)} placeholder="Ej: Liceo Bicentenario..." style={{width:"100%",padding:"12px 14px",background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:11,color:C.text,fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}/></div>
      <button onClick={()=>nick.trim()&&onDone(nick.trim(),emoji,col)} disabled={!nick.trim()} style={{width:"100%",padding:15,background:nick.trim()?C.accent:C.border,border:"none",borderRadius:13,color:nick.trim()?"#fff":C.muted,fontSize:15,fontWeight:900,cursor:nick.trim()?"pointer":"default",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>¡Empezar! 🚀</button>
    </div>
  </div>;
}

function AdminLogin({onDone,onBack}){
  const[nom,setNom]=useState(""),[code,setCode]=useState(""),[sh,setSh]=useState(false);
  const go=()=>{if(code!=="PAES2026"){setSh(true);setTimeout(()=>setSh(false),600);return;}onDone(nom||"Admin","👑","");};
  return<div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 24px"}}>
    <style>{GS}</style>
    <div style={{width:"100%",maxWidth:400}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.sub,fontSize:14,cursor:"pointer",marginBottom:22,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>← Volver</button>
      <div style={{textAlign:"center",marginBottom:22}}><div style={{fontSize:48,marginBottom:8}}>👑</div><h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,color:C.gold}}>Panel Admin</h2></div>
      <input value={nom} onChange={e=>setNom(e.target.value)} placeholder="Tu nombre" autoFocus style={{width:"100%",padding:"12px 14px",background:C.s2,border:`1.5px solid ${C.border}`,borderRadius:11,color:C.text,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:11}}/>
      <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Código (demo: PAES2026)" type="password" onKeyDown={e=>e.key==="Enter"&&go()} style={{width:"100%",padding:"12px 14px",background:C.s2,border:`1.5px solid ${sh?C.bad:C.gold+"44"}`,borderRadius:11,color:C.text,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:14,animation:sh?"shake .4s ease":"none"}}/>
      <button onClick={go} style={{width:"100%",padding:14,background:C.gold,border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:900,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>👑 Entrar</button>
    </div>
  </div>;
}

export default function App(){
  const[screen,setScreen]=useState("landing");
  const[user,setUser]=useState(null);
  const[regData,setRegData]=useState(null);
  const[quizCtx,setQuizCtx]=useState(null);
  const[lastRes,setLastRes]=useState([]);
  const[matDet,setMatDet]=useState(null);
  const[showWP,setShowWP]=useState(false);
  const[fb,setFb]=useState(null);
  const[fbLoad,setFbLoad]=useState(true);
  const[regErr,setRegErr]=useState("");
  const[loginErr,setLoginErr]=useState("");
  const[authLoad,setAuthLoad]=useState(false);

  useEffect(()=>{
    (async()=>{
      try{
        const{initializeApp,getApps}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
        const{getAuth,onAuthStateChanged}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
        const{getFirestore}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
        const app=getApps().length?getApps()[0]:initializeApp(FB_CFG);
        const auth=getAuth(app),db=getFirestore(app);
        setFb({auth,db});
        onAuthStateChanged(auth,async fbU=>{
          if(fbU){try{const{doc,getDoc}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");const s=await getDoc(doc(db,"usuarios",fbU.uid));if(s.exists()){setUser(s.data());setScreen("home");}}catch(e){}}
          setFbLoad(false);
        });
      }catch(e){setFbLoad(false);}
    })();
  },[]);

  const saveU=async u=>{if(!fb?.db)return;try{const{doc,setDoc}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");await setDoc(doc(fb.db,"usuarios",fb.auth?.currentUser?.uid||u.uid),u,{merge:true});}catch(e){}};
  const mkU=(n,e,c,rol="free",email="")=>({nick:n,emoji:e,colegio:c,rol,uid:genId(),email,stats:{xp:0,racha:0,oks:0,prog:5,ensayos:0},diagDone:false,historial:[],academico:null,createdAt:new Date().toISOString()});
  const goHome=()=>setScreen("home");

  const sel=id=>{
    if(["admin","perfil","ranking","historial","home","perfilAcademico"].includes(id)){setScreen(id);return;}
    if(id==="webpay"){setShowWP(true);return;}
    if(id==="diagnostico"){setQuizCtx({questions:QS.m1,materiaId:"m1",titulo:"Diagnóstico",isDiag:true});setScreen("quiz");return;}
    setMatDet(id);setScreen("materiaDetail");
  };

  const handleDone=results=>{
    setLastRes(results);
    const ok=results.filter(r=>r.ok).length,errs=results.filter(r=>!r.ok).map(r=>({tema:r.tema,src:r.src}));
    if(quizCtx?.isDiag)setUser(u=>({...u,diagDone:true}));
    setUser(u=>{const up={...u,historial:[...(u.historial||[]),...errs],stats:{...u.stats,oks:u.stats.oks+ok,xp:u.stats.xp+ok*10,racha:Math.max(u.stats.racha,1),prog:Math.min(100,u.stats.prog+ok*2),ensayos:(u.stats.ensayos||0)+1}};saveU(up);return up;});
    setScreen("result");
  };

  const logout=async()=>{if(fb?.auth){const{signOut}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");await signOut(fb.auth);}setUser(null);setScreen("landing");};
  const upU=u=>{setUser(u);saveU(u);};

  const gAuth=async()=>{try{if(fb?.auth){const{GoogleAuthProvider,signInWithPopup}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");const r=await signInWithPopup(fb.auth,new GoogleAuthProvider());return{email:r.user.email,displayName:r.user.displayName};}return{email:"demo@google.com"};}catch(e){return null;}};
  const loadDb=async()=>{try{if(fb?.db&&fb?.auth?.currentUser){const{doc,getDoc}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");const s=await getDoc(doc(fb.db,"usuarios",fb.auth.currentUser.uid));if(s.exists()){setUser(s.data());setScreen("home");return true;}}}catch(e){}return false;};

  if(fbLoad)return<div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><style>{GS}</style><div style={{textAlign:"center"}}><div style={{fontSize:48,marginBottom:16,animation:"float 2s ease-in-out infinite"}}>🎯</div><p style={{fontSize:16,fontWeight:700,color:C.text,margin:"0 0 8px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>PAES·AI</p><div style={{fontSize:24,animation:"spin 1s linear infinite",display:"inline-block",color:C.accent}}>⟳</div></div></div>;

  return<>
    {screen==="landing"&&<Landing onNext={s=>setScreen(s)}/>}
    {screen==="register"&&<AuthForm title="Crea tu cuenta" isReg={true} badge={true} loading={authLoad} err={regErr} onBack={()=>setScreen("landing")}
      onSubmit={async(e,p,p2)=>{setRegErr("");if(!e.includes("@")){setRegErr("Email inválido");return;}if(p.length<6){setRegErr("Mínimo 6 caracteres");return;}if(p!==p2){setRegErr("No coinciden");return;}setAuthLoad(true);try{if(fb?.auth){const{createUserWithEmailAndPassword}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");await createUserWithEmailAndPassword(fb.auth,e,p);}setRegData({email:e});setScreen("nickname");}catch(ex){setRegErr(ex.code==="auth/email-already-in-use"?"Email ya registrado":"Error al registrar.");}finally{setAuthLoad(false);}}}
      onGoogle={async()=>{const r=await gAuth();if(r){setRegData(r);setScreen("nickname");}}}/>}
    {screen==="nickname"&&<Nickname gName={regData?.displayName||""} onDone={async(n,e,c)=>{const u=mkU(n,e,c,"free",regData?.email||"");setUser(u);await saveU(u);setScreen("home");}}/>}
    {screen==="login"&&<AuthForm title="Bienvenido de vuelta 👋" isReg={false} loading={authLoad} err={loginErr} onBack={()=>setScreen("landing")}
      onSubmit={async(e,p)=>{setLoginErr("");setAuthLoad(true);try{if(fb?.auth){const{signInWithEmailAndPassword}=await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");await signInWithEmailAndPassword(fb.auth,e,p);}const ok=await loadDb();if(!ok){const u=mkU(e.split("@")[0],"🎯","","free",e);setUser(u);await saveU(u);setScreen("home");}}catch(ex){setLoginErr(ex.code==="auth/wrong-password"?"Contraseña incorrecta":"Cuenta no encontrada");}finally{setAuthLoad(false);}}}
      onGoogle={async()=>{const r=await gAuth();if(r){const ok=await loadDb();if(!ok){const u=mkU(r.displayName?.split(" ")[0]||"Usuario","🎯","","free",r.email||"");setUser(u);await saveU(u);setScreen("home");}}}}/>}
    {screen==="adminLogin"&&<AdminLogin onDone={(n,e,c)=>{setUser({...mkU(n,e,c,"admin"),stats:{xp:0,racha:1,oks:0,prog:5,ensayos:0}});setScreen("home");}} onBack={()=>setScreen("landing")}/>}
    {screen==="home"&&<Home user={user} onSelect={sel}/>}
    {screen==="materiaDetail"&&<MateriaDetail materiaId={matDet} onBack={goHome} onStartQuiz={(q,m,t,d)=>{setQuizCtx({questions:q,materiaId:m,titulo:t,isDiag:d});setScreen("quiz");}}/>}
    {screen==="quiz"&&<Quiz {...quizCtx} onBack={goHome} onDone={handleDone}/>}
    {screen==="result"&&<Resultado resultados={lastRes} onHome={goHome}/>}
    {screen==="perfil"&&<Perfil user={user} onBack={goHome} onLogout={logout} onUpdateUser={upU} onWebpay={()=>setShowWP(true)} onAcad={()=>setScreen("perfilAcademico")}/>}
    {screen==="perfilAcademico"&&<PerfilAcademico user={user} onSave={async u=>{setUser(u);await saveU(u);setScreen("home");}} onBack={()=>setScreen("perfil")}/>}
    {screen==="ranking"&&<Ranking user={user} onBack={goHome}/>}
    {screen==="historial"&&<Historial user={user} onBack={goHome}/>}
    {screen==="admin"&&<AdminPanel user={user} onBack={goHome}/>}
    {showWP&&<WebpayModal onClose={()=>setShowWP(false)} onSuccess={()=>{setShowWP(false);const u={...user,rol:"premium"};setUser(u);saveU(u);setScreen("home");}}/>}
  </>;
}
