(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{6915:(e,t,a)=>{Promise.resolve().then(a.bind(a,9390))},9390:(e,t,a)=>{"use strict";a.d(t,{default:()=>T});var r=a(5155),s=a(2115),l=a(3463),n=a(9795);function d(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,n.QP)((0,l.$)(t))}let i=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:d("rounded-xl border bg-card text-card-foreground shadow",a),...s})});i.displayName="Card",s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:d("flex flex-col space-y-1.5 p-6",a),...s})}).displayName="CardHeader",s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:d("font-semibold leading-none tracking-tight",a),...s})}).displayName="CardTitle",s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:d("text-sm text-muted-foreground",a),...s})}).displayName="CardDescription";let o=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:d("p-6 pt-0",a),...s})});o.displayName="CardContent",s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)("div",{ref:t,className:d("flex items-center p-6 pt-0",a),...s})}).displayName="CardFooter";var c=a(2317);let h=(0,a(1027).F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),m=s.forwardRef((e,t)=>{let{className:a,variant:s,size:l,asChild:n=!1,...i}=e,o=n?c.DX:"button";return(0,r.jsx)(o,{className:d(h({variant:s,size:l,className:a})),ref:t,...i})});m.displayName="Button";let x=s.forwardRef((e,t)=>{let{className:a,type:s,...l}=e;return(0,r.jsx)("input",{type:s,className:d("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",a),ref:t,...l})});x.displayName="Input";var u=a(6152),f=a(2926),g=a(8482),p=a(6535),y=a(5012),b=a(6694),v=a(5325),j=a(5524),w=a(6838);let N=s.forwardRef((e,t)=>{let{className:a,value:s,...l}=e;return(0,r.jsx)(w.bL,{ref:t,className:d("relative h-2 w-full overflow-hidden rounded-full bg-primary/20",a),...l,children:(0,r.jsx)(w.C1,{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:"translateX(-".concat(100-(s||0),"%)")}})})});N.displayName=w.bL.displayName;let k=e=>{let{onNewCard:t}=e,[a,l]=(0,s.useState)(""),[n,d]=(0,s.useState)(!1),[c,h]=(0,s.useState)(null),u=async e=>{if(e.preventDefault(),a.trim()){d(!0),h(null);try{let e=await fetch("https://chinese-flashcard-generator.iamtimzhu.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({word:a.trim()})});if(!e.ok){let t=await e.json();throw Error(t.error||"Failed to generate flashcard")}let r=await e.json();console.log("Anthropic response:",r);let s=null;if(r.content&&Array.isArray(r.content)){for(let e of r.content)if("text"===e.type){let t=e.text.match(/\{[\s\S]*\}/);if(t)try{s=JSON.parse(t[0]);break}catch(e){console.warn("Failed to parse JSON in this content block, trying next one")}}}if(!s)throw Error("Could not extract valid flashcard data from response");let n={word:a.trim(),pinyin:s.pinyin||"",translation:s.translation||"",example:s.example||"",etymology:s.etymology||"",character_components:s.character_components||{},korean_translation:s.korean_translation||""};t(n),l("")}catch(e){console.error("Error generating flashcard:",e),h(e instanceof Error?e.message:"An unknown error occurred")}finally{d(!1)}}};return(0,r.jsx)(i,{className:"w-full bg-white dark:bg-gray-800",children:(0,r.jsx)(o,{children:(0,r.jsxs)("form",{onSubmit:u,className:"space-y-4 pt-6",children:[(0,r.jsx)("h3",{className:"text-lg font-medium",children:"Add New Word"}),(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsx)(x,{type:"text",value:a,onChange:e=>l(e.target.value),placeholder:"Enter Chinese word or phrase",className:"flex-1",disabled:n}),(0,r.jsx)(m,{type:"submit",disabled:n||!a.trim(),children:n?"Generating...":"Add"})]}),c&&(0,r.jsx)("p",{className:"text-sm text-red-500",children:c})]})})})};var C=a(3691);let S=s.forwardRef((e,t)=>{let{className:a,children:s,...l}=e;return(0,r.jsxs)(C.bL,{ref:t,className:d("relative overflow-hidden",a),...l,children:[(0,r.jsx)(C.LM,{className:"h-full w-full rounded-[inherit]",children:s}),(0,r.jsx)(A,{}),(0,r.jsx)(C.OK,{})]})});S.displayName=C.bL.displayName;let A=s.forwardRef((e,t)=>{let{className:a,orientation:s="vertical",...l}=e;return(0,r.jsx)(C.VM,{ref:t,orientation:s,className:d("flex touch-none select-none transition-colors","vertical"===s&&"h-full w-2.5 border-l border-l-transparent p-[1px]","horizontal"===s&&"h-2.5 flex-col border-t border-t-transparent p-[1px]",a),...l,children:(0,r.jsx)(C.lr,{className:"relative flex-1 rounded-full bg-border"})})});A.displayName=C.VM.displayName;var E=a(8639),R=a(689);let L=e=>{let{cards:t}=e,[a,l]=(0,s.useState)(!1);return a?(0,r.jsx)(i,{className:"fixed bottom-4 right-4 w-96 h-[80vh] z-10",children:(0,r.jsxs)(o,{className:"p-4",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsxs)("h2",{className:"text-lg font-semibold",children:["Vocabulary List (",t.length,")"]}),(0,r.jsx)(m,{variant:"ghost",size:"sm",onClick:()=>l(!1),children:(0,r.jsx)(R.A,{className:"w-4 h-4"})})]}),(0,r.jsx)(S,{className:"h-[calc(80vh-100px)]",children:t.length>0?(0,r.jsx)("div",{className:"space-y-4",children:t.map((e,t)=>(0,r.jsxs)("div",{className:"border-b pb-2",children:[(0,r.jsx)("div",{className:"font-bold",children:e.word}),(0,r.jsx)("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:e.pinyin}),(0,r.jsx)("div",{className:"text-sm",children:e.translation})]},e.id||"card-".concat(t)))}):(0,r.jsx)("div",{className:"flex justify-center items-center h-full text-gray-500",children:"No vocabulary words yet"})})]})}):(0,r.jsxs)(m,{variant:"outline",size:"sm",className:"fixed bottom-4 right-4",onClick:()=>l(!0),children:[(0,r.jsx)(E.A,{className:"w-4 h-4 mr-2"}),"Show Vocabulary List (",t.length,")"]})},_=e=>{let{onCorrectPassword:t}=e,[a,l]=(0,s.useState)(""),[n,d]=(0,s.useState)(!1),[c,h]=(0,s.useState)(!1),f=async e=>{e.preventDefault(),h(!0);try{let e=new TextEncoder().encode(a),r=await crypto.subtle.digest("SHA-256",e);"d5195dceb1b1c2ac4ff7f2e83ac1a6f3f5a5f24370bf3c35c371ead8e5f40a8a"===Array.from(new Uint8Array(r)).map(e=>e.toString(16).padStart(2,"0")).join("")?(sessionStorage.setItem("isAuthenticated","true"),t()):(d(!0),setTimeout(()=>d(!1),2e3))}catch(e){d(!0),setTimeout(()=>d(!1),2e3)}finally{h(!1)}};return(0,r.jsx)("div",{className:"flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-900",children:(0,r.jsx)(i,{className:"w-full max-w-md mx-4",children:(0,r.jsx)(o,{className:"pt-6",children:(0,r.jsxs)("form",{onSubmit:f,className:"space-y-4",children:[(0,r.jsx)("div",{className:"flex justify-center mb-6",children:(0,r.jsx)(u.A,{className:"w-12 h-12 text-indigo-500"})}),(0,r.jsx)("h2",{className:"text-xl font-semibold text-center mb-4",children:"Enter Password"}),(0,r.jsx)(x,{type:"password",placeholder:"Enter password",value:a,onChange:e=>l(e.target.value),className:"w-full ".concat(n?"border-red-500":""),disabled:c}),n&&(0,r.jsx)("p",{className:"text-red-500 text-sm text-center",children:"Incorrect password"}),(0,r.jsx)(m,{type:"submit",className:"w-full",disabled:c,children:c?"Checking...":"Access Flashcards"})]})})})})},O=e=>{let{text:t,variant:a="default"}=e,[l,n]=(0,s.useState)(!1),d=async()=>{try{n(!0);let e=await fetch("https://chinese-tts-proxy.iamtimzhu.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t})});if(!e.ok){let t=await e.text();throw console.error("TTS Error:",t),Error("Failed to generate speech")}let a=await e.blob(),r=URL.createObjectURL(a),s=new Audio(r);s.onended=()=>{n(!1),URL.revokeObjectURL(r)},await s.play()}catch(e){console.error("Speech error:",e),n(!1)}};return"inline"===a?(0,r.jsx)("button",{onClick:e=>{e.stopPropagation(),l||d()},disabled:l,className:"inline-flex items-center justify-center w-6 h-6 ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",children:(0,r.jsx)(f.A,{className:"h-4 w-4 ".concat(l?"text-blue-500":"")})}):(0,r.jsx)(m,{variant:"outline",size:"icon",onClick:e=>{e.stopPropagation(),l||d()},disabled:l,className:"absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700",children:(0,r.jsx)(f.A,{className:"h-4 w-4 ".concat(l?"text-blue-500":"")})})},T=()=>{var e,t,a,l,n,d,c,h,x;let[u,f]=(0,s.useState)(!1),w="https://flashcard-data.yourusername.workers.dev",C=e=>[...e].sort(()=>Math.random()-.5),[S,A]=(0,s.useState)(0),[E,R]=(0,s.useState)(!1),[T,P]=(0,s.useState)([]),[z,F]=(0,s.useState)("light"),[q,M]=(0,s.useState)(new Set),[U,D]=(0,s.useState)(!1),[I,J]=(0,s.useState)(!0),[V,H]=(0,s.useState)({cardCount:0,uniqueCharacterCount:0}),K=(0,s.useCallback)(async()=>{try{J(!0);let e=await fetch("".concat(w,"/flashcards"));if(!e.ok)throw Error("Failed to fetch flashcards");let t=await e.json();P(C(t.cards||[])),H(t.stats||{cardCount:0,uniqueCharacterCount:0})}catch(e){console.error("Error fetching flashcards:",e),P([]),H({cardCount:0,uniqueCharacterCount:0})}finally{J(!1)}},[w]);if((0,s.useEffect)(()=>{D(!0),window.matchMedia("(prefers-color-scheme: dark)").matches&&(F("dark"),document.documentElement.classList.add("dark")),"true"===sessionStorage.getItem("isAuthenticated")&&(f(!0),K())},[K]),(0,s.useEffect)(()=>{u&&K()},[u,K]),!u)return(0,r.jsx)(_,{onCorrectPassword:()=>f(!0)});if(!U||I)return(0,r.jsx)("div",{className:"flex flex-col items-center gap-4 w-full max-w-2xl mx-auto p-4",children:(0,r.jsx)(i,{className:"min-h-[400px] max-h-[600px] max-w-md",children:(0,r.jsx)(o,{className:"h-full flex items-center justify-center p-4",children:(0,r.jsx)("div",{className:"text-2xl font-bold",children:"Loading..."})})})});let W=async()=>{if(T.length<=1)return;let e=T[S];console.log("Attempting to remove card:",e.word),P(e=>e.filter((e,t)=>t!==S)),S===T.length-1&&A(S-1),M(e=>new Set(Array.from(e).filter(e=>e!==S).map(e=>e>S?e-1:e))),R(!1);try{console.log("Sending delete request for word:",e.word);let t=await fetch("".concat(w,"/flashcards/").concat(encodeURIComponent(e.word)),{method:"DELETE"});if(console.log("Delete response status:",t.status),t.ok){let e=await t.json();console.log("Successfully deleted flashcard"),H(e.stats||{cardCount:T.length-1,uniqueCharacterCount:V.uniqueCharacterCount})}else{let e=await t.json();console.error("Failed to delete flashcard:",e.error)}}catch(e){console.error("Error when deleting flashcard:",e)}},X=T.length>0?q.size/T.length*100:0,B=async e=>{P(t=>[...t,e]);try{let t=await fetch("".concat(w,"/flashcards"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({card:e})});if(!t.ok)throw Error("Failed to save flashcard");let a=await t.json();a.card&&a.card.id&&P(t=>t.map(t=>t.word===e.word?{...t,id:a.card.id}:t)),a.stats&&H(a.stats)}catch(e){console.error("Error saving flashcard:",e)}};return(0,r.jsx)("div",{className:"fixed inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 overflow-auto",children:(0,r.jsxs)("div",{className:"flex flex-col items-center max-w-2xl mx-auto px-6 pt-6 pb-24 min-h-full",children:[(0,r.jsx)(m,{variant:"outline",size:"icon",onClick:()=>{F(e=>{let t="light"===e?"dark":"light";return"dark"===t?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),t})},className:"self-end bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700",children:"light"===z?(0,r.jsx)(g.A,{className:"h-4 w-4"}):(0,r.jsx)(p.A,{className:"h-4 w-4"})}),(0,r.jsxs)("div",{className:"w-full space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-4",children:[(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("div",{className:"flex justify-between text-sm font-medium",children:[(0,r.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:"Study Progress"}),(0,r.jsxs)("span",{className:"text-gray-600 dark:text-gray-400",children:[Math.round(X),"% Complete"]})]}),(0,r.jsx)(N,{value:X,className:"h-2 bg-indigo-100 dark:bg-gray-700",children:(0,r.jsx)("div",{className:"h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"})})]}),(0,r.jsxs)("div",{className:"grid grid-cols-3 gap-4 mt-4",children:[(0,r.jsxs)("div",{className:"bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center",children:[(0,r.jsx)("p",{className:"text-indigo-600 dark:text-indigo-300 text-lg font-bold",children:V.cardCount}),(0,r.jsx)("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Words/Phrases"})]}),(0,r.jsxs)("div",{className:"bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-center",children:[(0,r.jsx)("p",{className:"text-purple-600 dark:text-purple-300 text-lg font-bold",children:V.uniqueCharacterCount}),(0,r.jsx)("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Unique Characters"})]}),(0,r.jsxs)("div",{className:"bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-center",children:[(0,r.jsxs)("p",{className:"text-blue-600 dark:text-blue-300 text-lg font-bold",children:[Math.round(X),"%"]}),(0,r.jsx)("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Session Progress"})]})]}),(0,r.jsx)("div",{className:"flex justify-between items-center pt-2",children:(0,r.jsx)("span",{className:"text-sm text-gray-600 dark:text-gray-300",children:T.length>0?"Card ".concat(S+1," of ").concat(T.length):"No cards yet"})})]}),T.length>0?(0,r.jsx)(i,{className:"min-h-[400px] max-h-[600px] w-full cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-200 mt-4",onClick:()=>{R(!E)},children:(0,r.jsxs)(o,{className:"h-full flex items-center justify-center p-6 relative",children:[E?(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)("p",{className:"text-xl sm:text-2xl text-blue-600 dark:text-blue-400",children:null===(t=T[S])||void 0===t?void 0:t.pinyin}),(0,r.jsx)("p",{className:"text-lg sm:text-xl font-medium text-purple-600 dark:text-purple-400",children:null===(a=T[S])||void 0===a?void 0:a.translation}),(0,r.jsxs)("p",{className:"text-sm text-gray-600 dark:text-gray-400 flex items-center",children:[null===(l=T[S])||void 0===l?void 0:l.example,(0,r.jsx)(O,{text:(null===(n=T[S])||void 0===n?void 0:n.example)||"",variant:"inline"})]}),(0,r.jsx)("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:null===(d=T[S])||void 0===d?void 0:d.etymology}),(0,r.jsxs)("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:[(0,r.jsx)("h4",{className:"font-medium",children:"Character Components:"}),Object.entries((null===(c=T[S])||void 0===c?void 0:c.character_components)||{}).map(e=>{let[t,a]=e;return(0,r.jsxs)("p",{children:[t,": ",Array.isArray(a)?a.join(" • "):a]},t)})]}),(0,r.jsxs)("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:[(0,r.jsx)("h4",{className:"font-medium",children:"Korean Translation:"}),(0,r.jsx)("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:null===(h=T[S])||void 0===h?void 0:h.korean_translation})]})]}):(0,r.jsx)("div",{className:"relative top-20 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400",children:null===(e=T[S])||void 0===e?void 0:e.word}),(0,r.jsx)(O,{text:(null===(x=T[S])||void 0===x?void 0:x.word)||""})]})}):(0,r.jsx)(i,{className:"min-h-[400px] max-h-[600px] w-full mt-4",children:(0,r.jsx)(o,{className:"h-full flex items-center justify-center p-6",children:(0,r.jsxs)("div",{className:"text-center text-gray-500 dark:text-gray-400",children:[(0,r.jsx)("p",{className:"text-xl",children:"No flashcards yet"}),(0,r.jsx)("p",{className:"mt-2",children:"Add a new word below to get started"})]})})}),(0,r.jsxs)("div",{className:"flex justify-between w-full gap-4 mt-4",children:[(0,r.jsxs)(m,{variant:"outline",onClick:()=>{S>0&&(A(S-1),R(!1))},disabled:0===S||0===T.length,className:"flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm",children:[(0,r.jsx)(y.A,{className:"h-4 w-4 mr-2"}),(0,r.jsx)("span",{className:"hidden sm:inline",children:"Previous"})]}),(0,r.jsxs)(m,{variant:"outline",onClick:()=>{P(C(T)),A(0),R(!1),M(new Set)},disabled:T.length<=1,className:"flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm",children:[(0,r.jsx)(b.A,{className:"h-4 w-4 mr-2"}),(0,r.jsx)("span",{className:"hidden sm:inline",children:"Shuffle"})]}),(0,r.jsxs)(m,{variant:"outline",onClick:()=>{S<T.length-1&&(A(S+1),R(!1),M(e=>new Set(e).add(S)))},disabled:S===T.length-1||0===T.length,className:"flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm",children:[(0,r.jsx)("span",{className:"hidden sm:inline",children:"Next"}),(0,r.jsx)(v.A,{className:"h-4 w-4 ml-2"})]})]}),(0,r.jsx)("div",{className:"pt-8 w-full",children:(0,r.jsx)(k,{onNewCard:B})}),(0,r.jsx)(L,{cards:T}),(0,r.jsxs)(m,{variant:"outline",onClick:W,disabled:T.length<=1,className:"fixed bottom-6 left-6 ml-6 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300",children:[(0,r.jsx)(j.A,{className:"h-4 w-4 mr-2"}),(0,r.jsx)("span",{className:"hidden sm:inline",children:"Remove Card"})]})]})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[478,441,517,358],()=>t(6915)),_N_E=e.O()}]);