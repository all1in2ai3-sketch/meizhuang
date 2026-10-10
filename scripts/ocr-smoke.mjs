import {createWorker} from 'tesseract.js';
const worker=await createWorker('eng');try{const result=await worker.recognize('public/assets/fit-me.png');console.log(JSON.stringify({confidence:result.data.confidence,text:result.data.text}));}finally{await worker.terminate();}
