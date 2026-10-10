import {Link} from 'react-router-dom';
import {useStore} from './store';
import {products} from './products';
import s from './Features.module.css';
export default function ProductAlerts(){const {owned,customProducts}=useStore();const catalog=[...products,...customProducts];const upcoming=owned.filter(o=>o.estimatedEnd&&Date.parse(o.estimatedEnd)<=Date.now()+7*86400000);return <section className={s.panel}><h2>展柜小提醒</h2>{upcoming.length?upcoming.map(o=><div className={s.list} key={o.productId}><div><strong>{catalog.find(p=>p.id===o.productId)?.name||'自有产品'}</strong><p>你填写的预计用完日期：{o.estimatedEnd}。</p></div><Link className={s.link} to={`/cabinet?product=${o.productId}`}>检查与更新记录 →</Link></div>):<p>暂无未来 7 天内预计用完的产品。可在产品详情填写预计日期。</p>}<Link className={s.link} to="/scan">扫描添加手边产品 →</Link></section>}
