import { useEffect, useRef, useState } from "react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=153+B%C3%B9i+X%C6%B0%C6%A1ng+Tr%E1%BA%A1ch%2C+Thanh+Xu%C3%A2n%2C+H%C3%A0+N%E1%BB%99i";

const navItems = [
  ["Câu chuyện", "#cau-chuyen"],
  ["Dịch vụ", "#dich-vu"],
  ["Trải nghiệm", "#trai-nghiem"],
  ["Liên hệ", "#lien-he"],
];

const services = [
  {
    icon: "✦",
    title: "Cắt & tạo kiểu",
    copy: "Tư vấn theo khuôn mặt, xử lý form và hoàn thiện kiểu tóc phù hợp.",
  },
  {
    icon: "〰",
    title: "Uốn & texture",
    copy: "Tạo độ phồng, chuyển động và kết cấu tự nhiên cho từng chất tóc.",
  },
  {
    icon: "◐",
    title: "Nhuộm màu",
    copy: "Lựa chọn tông màu hài hòa với làn da, phong cách và môi trường làm việc.",
  },
  {
    icon: "◇",
    title: "Chăm sóc & hoàn thiện",
    copy: "Làm sạch, chăm sóc tóc và hướng dẫn cách giữ nếp phù hợp tại nhà.",
  },
];

const experienceSteps = [
  ["Lắng nghe", "Hiểu mong muốn và thói quen tạo kiểu của bạn."],
  ["Tạo form", "Thực hiện kỹ thuật phù hợp với gương mặt và chất tóc."],
  ["Hoàn thiện", "Chỉnh từng chi tiết và hướng dẫn giữ nếp tại nhà."],
];

function Brand({ footer = false }) {
  return (
    <a
      className={`brand${footer ? " footer-brand" : ""}`}
      href="#trang-chu"
      aria-label="Bee Barber House — Trang chủ"
    >
      <span className="brand-mark" aria-hidden="true">
        B
      </span>
      <span className="brand-copy">
        <strong>BEE</strong>
        <small>BARBER HOUSE</small>
      </span>
    </a>
  );
}

function Reveal({ as: Tag = "div", className = "", children, ...props }) {
  const nodeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={nodeRef}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 16);
    const handleResize = () => {
      if (window.innerWidth > 980) setMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell">
        <Brand />

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`main-nav${menuOpen ? " is-open" : ""}`}
          id="main-nav"
          aria-label="Điều hướng chính"
        >
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#lien-he">
          Ghé quán
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="trang-chu">
      <div className="hive-grid" aria-hidden="true" />
      <div className="hero-shell">
        <Reveal className="hero-copy">
          <p className="eyebrow">
            <span /> Barber tại Thanh Xuân, Hà Nội
          </p>
          <h1>
            <span>BEE</span>
            <br />
            BARBER HOUSE
          </h1>
          <p className="hero-lead">
            Chất riêng không đến từ sự ồn ào. Nó nằm trong một mái tóc đúng form,
            một đường kéo chuẩn và sự tự tin khi bạn bước ra khỏi ghế.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#dich-vu">
              Khám phá dịch vụ
            </a>
            <a className="button button-ghost" href={MAPS_URL} target="_blank" rel="noreferrer">
              Chỉ đường
            </a>
          </div>
          <div className="hero-meta" aria-label="Thông tin cửa hàng">
            <div>
              <small>ĐỊA CHỈ</small>
              <strong>153 Bùi Xương Trạch</strong>
            </div>
            <div>
              <small>GIỜ MỞ CỬA</small>
              <strong>09:00 — 20:30</strong>
            </div>
          </div>
        </Reveal>

        <Reveal as="figure" className="hero-visual">
          <div className="visual-frame">
            <img
              src="/assets/bee-barber-king.jpg"
              alt="Hình ảnh nhận diện Bee Barber House với vua ong cầm kéo barber"
              width="1024"
              height="1024"
            />
          </div>
          <figcaption>
            <span>EST.</span>
            <strong>OWN YOUR LOOK</strong>
            <span>HÀ NỘI</span>
          </figcaption>
        </Reveal>
      </div>
      <div className="hero-marquee" aria-hidden="true">
        <div>
          PRECISION CUT <i /> SIGNATURE STYLE <i /> BEE BARBER HOUSE <i /> PRECISION CUT <i /> SIGNATURE STYLE
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story section" id="cau-chuyen">
      <div className="section-shell story-grid">
        <Reveal className="section-kicker">
          <span>01</span>
          <p>Câu chuyện của Bee</p>
        </Reveal>
        <Reveal className="story-copy">
          <p className="overline">KHÔNG CHỈ LÀ MỘT MÁI TÓC</p>
          <h2>Nơi phong cách được tạo nên bằng sự chỉn chu.</h2>
          <p>
            Bee Barber House hướng tới một không gian gần gũi nhưng khác biệt — nơi
            mỗi khách hàng được lắng nghe, tư vấn và hoàn thiện kiểu tóc phù hợp với
            gương mặt, công việc và cá tính của chính mình.
          </p>
        </Reveal>
        <Reveal className="story-signature" aria-label="Thông điệp thương hiệu">
          <span className="signature-b">B</span>
          <p>
            Sharp cut.
            <br />
            Strong character.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services section" id="dich-vu">
      <div className="section-shell">
        <Reveal className="section-heading">
          <div>
            <p className="overline">DỊCH VỤ TẠI BEE</p>
            <h2>
              Đúng kỹ thuật.
              <br />
              Đúng phong cách.
            </h2>
          </div>
          <p>
            Từ kiểu tóc gọn gàng hằng ngày đến một diện mạo mới rõ cá tính,
            Bee chăm chút từng bước để form tóc đẹp ngay tại tiệm và dễ giữ nếp ở nhà.
          </p>
        </Reveal>

        <div className="service-grid">
          {services.map((service, index) => (
            <Reveal as="article" className="service-card" key={service.title}>
              <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="service-icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href="#lien-he">
                Tìm hiểu thêm <span>↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience section" id="trai-nghiem">
      <div className="section-shell">
        <Reveal className="experience-panel">
          <div className="experience-title">
            <p className="overline">THE BEE EXPERIENCE</p>
            <h2>
              Một lần ngồi ghế.
              <br />
              Một diện mạo khác.
            </h2>
          </div>
          <ol className="experience-list">
            {experienceSteps.map(([title, copy], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section" id="lien-he">
      <div className="section-shell contact-grid">
        <Reveal className="contact-copy">
          <p className="overline">GẶP NHAU TẠI BEE</p>
          <h2>Sẵn sàng cho một phiên bản sắc nét hơn?</h2>
          <p>Ghé Bee Barber House để được tư vấn kiểu tóc phù hợp với chính bạn.</p>
          <a className="button button-dark" href={MAPS_URL} target="_blank" rel="noreferrer">
            Mở Google Maps
          </a>
        </Reveal>
        <Reveal className="contact-card">
          <div>
            <small>ĐỊA CHỈ</small>
            <strong>
              153 Bùi Xương Trạch
              <br />
              Thanh Xuân, Hà Nội
            </strong>
          </div>
          <div>
            <small>GIỜ MỞ CỬA</small>
            <strong>09:00 — 20:30</strong>
          </div>
          <div className="contact-note">
            <span />
            <p>Thông tin đặt lịch trực tuyến sẽ được cập nhật.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#noi-dung">
        Bỏ qua tới nội dung
      </a>
      <Header />
      <main id="noi-dung">
        <Hero />
        <Story />
        <Services />
        <Experience />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="footer-shell">
          <Brand footer />
          <p>153 Bùi Xương Trạch, Thanh Xuân, Hà Nội</p>
          <p>© {new Date().getFullYear()} Bee Barber House.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
