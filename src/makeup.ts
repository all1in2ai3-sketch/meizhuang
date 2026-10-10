export const looks=[
 {id:'有精神',name:'清透通勤',tag:'轻底妆 · 唇色提气色',base:'保留肤感，先均匀需要调整的区域',lip:'用你已有的唇色做一个轻量重点',check:'正面和侧面各看一次，脸颈衔接自然即可',color:'#b76e57',index:0},
 {id:'温柔',name:'柔雾约会',tag:'柔和边缘 · 降低对比',base:'薄薄一层，避免反复叠加',lip:'轻涂一层，让唇部边缘柔和过渡',check:'离镜子一步看整体，不必追求每一处都遮住',color:'#a96875',index:1},
 {id:'正式',name:'利落会面',tag:'均匀底妆 · 清晰唇形',base:'优先检查鼻翼、嘴角和脸侧的衔接',lip:'沿自己的唇形整理边缘，左右保持协调',check:'在接近见面场景的光线下检查唇缘和脸颈边界',color:'#96564d',index:2},
] as const;
export type MakeupOptions={request?:string;focus?:'balanced'|'base'|'lip';avoid?:string};
export function makeupBrief(mood:string,options:MakeupOptions={}){
 const request=options.request||'';
 const look=looks.find(l=>l.id===mood)||looks[0];
 const focus=options.focus||(/唇|口红/.test(request)?'lip':/底妆|肤色/.test(request)?'base':'balanced');
 const occasion=/面试/.test(request)?'面试':/会议|开会/.test(request)?'会面':/约会/.test(request)?'约会':/晚上|夜晚|晚宴/.test(request)?'晚间活动':/通勤|上班/.test(request)?'通勤':'日常';
 const avoid=options.avoid||(/不要太浓|清淡|不浓|淡妆/.test(request)?'避免浓重叠加':'');
 const noLip=/不(?:要|用|涂|做)(?:[^，。；\n]{0,4})?(?:口红|唇妆|唇膏)/.test(request)||/口红|唇妆|唇膏/.test(avoid);
 const noBase=/不(?:要|用|涂|做)(?:[^，。；\n]{0,4})?(?:粉底|底妆)/.test(request)||/粉底|底妆/.test(avoid);
 return {mood:look.id,occasion,focus,avoid,noLip,noBase};
}
