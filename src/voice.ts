export function speak(text:string){if(!('speechSynthesis' in window))return false;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='zh-CN';u.rate=.9;window.speechSynthesis.speak(u);return true;}
export function stopSpeech(){window.speechSynthesis?.cancel();}
type RecognitionResult={results:{[key:number]:{[key:number]:{transcript:string}}}};
type Recognition={lang:string;continuous:boolean;interimResults:boolean;onresult:((e:RecognitionResult)=>void)|null;onerror:((e:{error:string})=>void)|null;onend:(()=>void)|null;start:()=>void;stop:()=>void;abort:()=>void};
export function listen(onText:(t:string)=>void,onState:(s:string)=>void):(()=>void)|null{
 const w=window as unknown as {SpeechRecognition?:new()=>Recognition;webkitSpeechRecognition?:new()=>Recognition};const C=w.SpeechRecognition??w.webkitSpeechRecognition;
 if(!C){onState('当前浏览器不支持语音输入，请用文字或按钮操作。');return null;}
 const r=new C();r.lang='zh-CN';r.continuous=false;r.interimResults=false;
 r.onresult=e=>{onText(e.results[0][0].transcript);onState('已识别，请确认内容。');};r.onerror=()=>onState('语音输入不可用，请检查权限或改用文字。');r.onend=()=>{};
 try{r.start();onState('正在聆听…语音识别可能使用浏览器的远程服务。');}catch{onState('无法启动语音，请稍后重试。');}return ()=>r.abort();
}
