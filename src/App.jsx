import { useEffect, useRef, useState } from 'react';
const logo = `${import.meta.env.BASE_URL}assets/bee-logo.jpeg`;
const maps = 'https://www.google.com/maps/search/?api=1&query=441+Vũ+Hữu+Thanh+Xuân+Hà+Nội';
const services = [
 ['01','Cắt & tạo kiểu','Một mái tóc hợp gương mặt. Một diện mạo đúng chất bạn.','Tư vấn kiểu tóc · Cắt tạo form · Hoàn thiện'],
 ['02','Uốn & tạo texture','Thêm chuyển động tự nhiên, giữ lại cá tính riêng.','Tư vấn chất tóc · Tạo độ phồng · Hướng dẫn giữ nếp'],
 ['03','Nhuộm & chăm sóc','Một sắc màu mới, được lựa chọn thật chỉn chu.','Tư vấn màu · Nhuộm tóc · Chăm sóc sau dịch vụ'],
];
const articles = [
 {category:'TẠO KIỂU',title:'Mái tóc đẹp bắt đầu từ một form tóc phù hợp.',sub:'FIND YOUR\nSIGNATURE.',body:['Một kiểu tóc đẹp trên ảnh chưa chắc đã phù hợp với mọi người. Độ dày, hướng mọc và cách bạn chăm sóc tóc mỗi ngày đều ảnh hưởng đến kết quả.','Khi đến quán, hãy chia sẻ cách bạn thường để tóc, thời gian dành cho việc tạo kiểu và mang theo ảnh tham khảo nếu có. Barber sẽ cùng bạn chọn độ dài và form tóc dễ sử dụng trong cuộc sống hằng ngày.','Trước khi kết thúc, hãy nhờ barber hướng dẫn lại cách sấy và tạo kiểu để bạn có thể tự làm ở nhà.']},
 {category:'CHĂM SÓC TÓC',title:'Giữ nếp tại nhà: ít hơn, nhưng đúng cách.',sub:'GOOD HAIR.\nEVERY DAY.',body:['Sau khi gội, dùng khăn thấm nhẹ cho tóc bớt nước. Sấy theo hướng muốn tạo kiểu, di chuyển máy liên tục và tránh đưa nguồn nhiệt quá gần da đầu.','Lấy một lượng nhỏ sản phẩm tạo kiểu, xoa đều trong lòng bàn tay rồi vuốt từng chút lên tóc. Bạn có thể thêm nếu cần; dùng quá nhiều ngay từ đầu dễ khiến tóc nặng và bết.','Cuối ngày, làm sạch sản phẩm theo hướng dẫn trên bao bì. Chọn sản phẩm phù hợp với chất tóc và hỏi barber nếu bạn chưa biết bắt đầu từ đâu.']},
 {category:'GÓC BARBER',title:'Trước khi đổi kiểu, hãy nói chuyện với barber.',sub:'YOUR STYLE.\nYOUR RULES.',body:['Một cuộc trao đổi ngắn trước khi cắt giúp barber hiểu rõ hơn điều bạn muốn. Hãy nói cả những điểm bạn thích và những điều khiến bạn chưa hài lòng ở kiểu tóc hiện tại.','Bạn muốn giữ độ dài phía trên? Thích phần mai gọn nhưng không quá sát? Cần một kiểu tóc phù hợp công việc? Càng cụ thể, việc tư vấn càng dễ đi đúng hướng.','Nếu muốn thay đổi nhiều, hãy thống nhất độ dài và cách hoàn thiện trước khi bắt đầu. Sự thoải mái của bạn với mái tóc mới luôn là điều quan trọng.']},
];
const pages = {home: 'Trang chủ', about: 'Về Bee', services: 'Dịch vụ', journal: 'Góc chăm sóc', contact: 'Liên hệ'};
const routes = {home: '#/', about: '#/ve-bee', services: '#/dich-vu', journal: '#/goc-cham-soc', contact: '#/lien-he'};
function currentPage() { return Object.keys(routes).find(key => routes[key] === window.location.hash || '#' + key === window.location.hash) || 'home'; }
function Arrow(){return <span aria-hidden="true">↗</span>}
function Brand(){return <a className="brand" href="#/" aria-label="Bee Barber House - Trang chủ"><img src={logo} width="52" height="52" alt="Logo ong Bee Barber House"/><span>BEE BARBER HOUSE<small>REAL CUT · HÀ NỘI</small></span></a>}
export default function App(){
 const [page,setPage]=useState(currentPage);
 const mainRef=useRef(null);
 const [menu,setMenu]=useState(false),[article,setArticle]=useState(null);const dialog=useRef(null);
 useEffect(()=>{if(article)dialog.current?.showModal()},[article]);
 useEffect(()=>{const close=e=>{if(e.key==='Escape')setMenu(false)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[]);
 useEffect(()=>{
   const navigate=()=>{
     if(window.location.hash==='#main')return;
     setPage(currentPage());setMenu(false);dialog.current?.close();
     window.scrollTo({top:0,behavior:'instant'});
     mainRef.current?.focus({preventScroll:true});
   };
   window.addEventListener('hashchange',navigate);
   return()=>window.removeEventListener('hashchange',navigate);
 },[]);
 useEffect(()=>{document.title=pages[page]+' | Bee Barber House';},[page]);
 return <>
 <a className="skip" href="#main">Đến nội dung chính</a>
 <div className="topline"><span>BARBER TẠI THANH XUÂN, HÀ NỘI</span><span>09:00 — 20:30 MỖI NGÀY</span></div>
 <header><div className="nav wrap"><Brand/><nav className={menu?'open':''} id="navigation" aria-label="Điều hướng chính">{Object.entries(pages).map(([key,label])=><a key={key} href={routes[key]} aria-current={page===key?'page':undefined} onClick={()=>setMenu(false)}>{label}</a>)}</nav><a className="button small" href="#/lien-he">Ghé Bee <Arrow/></a><button className="menu" aria-label={menu?'Đóng menu':'Mở menu'} aria-controls="navigation" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?'✕':'☰'}</button></div></header>
 <main id="main" ref={mainRef} tabIndex={-1} className={page==='home'?'home-page':'inner-page'}>
 {page!=='home'&&<div className="page-heading wrap"><a href="#/">Trang chủ</a><span aria-hidden="true"> / </span><h1>{pages[page]}</h1></div>}
 {(page==='home')&&(<section className="hero" id="home"><div className="hero-ring" aria-hidden="true"/><div className="hero-content wrap"><p className="eyebrow">BEE BARBER HOUSE <span>✦</span> REAL CUT</p><div className="crest"><img src={logo} alt="Biểu tượng ong cầm tông đơ và kéo của Bee Barber House" width="180" height="164" fetchPriority="high"/></div><h1>Diện mạo chỉn chu.<br/><em>Phong cách riêng.</em></h1><p className="hero-description">Một đường kéo tinh tế. Một mái tóc đúng chất.<br/>Dành thời gian cho bản thân, bắt đầu tại Bee.</p><div className="actions"><a className="button" href="#/lien-he">Ghé Bee Barber House <Arrow/></a><a className="button outline" href="#/dich-vu">Khám phá dịch vụ</a></div></div><div className="hero-bottom wrap"><span>441 VŨ HỮU · THANH XUÂN</span><a href="#/ve-bee">KHÁM PHÁ VỀ BEE <span>↓</span></a><span>HÀ NỘI, VIỆT NAM</span></div></section>)}
 {(page==='home'||page==='about')&&(<section className="intro wrap section" id="about"><div><p className="eyebrow">TINH THẦN CỦA BEE</p><h2>Gọn gàng trong diện mạo.<br/><em>Tự tin trong từng ngày.</em></h2></div><div className="intro-copy"><p>Bee Barber House là nơi bạn dành một khoảng thời gian cho chính mình. Chúng tôi lắng nghe, tư vấn và chăm chút từng chi tiết để mái tóc phù hợp với gương mặt, thói quen và cá tính của bạn.</p><a className="text-link" href="#/dich-vu">Tìm kiểu tóc của bạn <Arrow/></a></div></section>)}
 {(page==='home'||page==='services')&&(<section className="service-section section" id="services"><div className="wrap"><div className="section-head"><div><p className="eyebrow">THE BEE SERVICES</p><h2>Chỉn chu từ <em>từng chi tiết.</em></h2></div><span className="side-note">KỸ THUẬT · PHONG CÁCH · TRẢI NGHIỆM</span></div><div className="service-list">{services.map(([n,title,desc,detail])=><a className="service" key={n} href="#/lien-he"><span className="number">{n}</span><h3>{title}</h3><div><p>{desc}</p><small>{detail}</small></div><span className="circle-arrow"><Arrow/></span></a>)}</div><p className="service-note">Trao đổi trực tiếp tại quán để được tư vấn dịch vụ và báo giá phù hợp với mái tóc của bạn.</p></div></section>)}
 {(page==='home'||page==='journal')&&(<section className="section wrap" id="journal"><div className="section-head"><div><p className="eyebrow">THE BEE JOURNAL</p><h2>Chuyện tóc. <em>Chuyện phong cách.</em></h2></div><span className="side-note">MỘT CHÚT CHĂM SÓC MỖI NGÀY</span></div><div className="articles">{articles.map((item,i)=><button className="article" key={item.title} onClick={()=>setArticle(item)}><div className={`article-art art-${i}`} aria-hidden="true"><span>BEE / JOURNAL</span><strong>{item.sub}</strong><span className="art-bottom">REAL CUT <span>✦</span> 0{i+1}</span></div><div className="article-copy"><p className="eyebrow">{item.category}</p><h3>{item.title}</h3><span className="read-more">Đọc bài viết <Arrow/></span></div></button>)}</div></section>)}
 {(page==='home'||page==='contact')&&(<section className="contact-section" id="contact"><div className="wrap contact-grid"><div><p className="eyebrow">YOUR NEXT GOOD HAIR DAY</p><h2>Hẹn gặp bạn<br/><em>tại Bee.</em></h2><p>Một mái tóc mới. Một tinh thần mới.<br/>Ghé quán để cùng tìm diện mạo dành riêng cho bạn.</p><a className="button" href={maps} target="_blank" rel="noreferrer">Chỉ đường đến quán <Arrow/></a></div><div className="address-card"><p className="eyebrow">BEE BARBER HOUSE</p><h3>441 Vũ Hữu</h3><p>Thanh Xuân, Hà Nội</p><div className="hours"><span>GIỜ MỞ CỬA</span><strong>09:00 — 20:30</strong></div><p className="visit-note">Bạn có thể ghé trực tiếp trong giờ mở cửa để được tư vấn. Quán hiện chưa nhận đặt lịch qua website.</p><a className="text-link" href={maps} target="_blank" rel="noreferrer">Mở Google Maps <Arrow/></a></div></div></section>)}
 </main><footer className="wrap"><div className="footer-top"><Brand/><p>Chăm chút mái tóc.<br/>Tôn trọng chất riêng.</p><div><a href="#/dich-vu">Dịch vụ</a><a href="#/goc-cham-soc">Góc chăm sóc</a><a href="#/lien-he">Liên hệ</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Bee Barber House.</span><a href="#/">VỀ TRANG CHỦ ↑</a><span>REAL CUT. REAL YOU.</span></div></footer>
 <dialog ref={dialog} onClose={()=>setArticle(null)} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><button className="close-dialog" aria-label="Đóng bài viết" onClick={()=>dialog.current.close()}>✕</button>{article&&<article><p className="eyebrow">BEE JOURNAL · {article.category}</p><h2>{article.title}</h2>{article.body.map(p=><p key={p}>{p}</p>)}<p className="article-sign">BEE BARBER HOUSE · REAL CUT</p></article>}</dialog>
 </>;
}