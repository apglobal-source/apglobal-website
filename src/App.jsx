import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════ DEFAULT CMS DATA ═══════════ */
const D0 = {
  hero: {
    badge: { ko: "자동차 산업 토탈 솔루션 프로바이더", en: "Automotive Total Solution Provider" },
    title: { ko: "해외 부품 강소기업을\n한국 OEM과\n연결합니다", en: "Your Gateway to\nKorean Automotive\nOEM Market" },
    subtitle: { ko: "20년 이상의 업력으로 현대·기아를 포함한 한국 자동차 OEM에\n해외 우수 부품사를 소개하고 영업·개발·품질을 지원합니다", en: "With 20+ years of expertise, we represent global automotive suppliers\nin the Korean OEM market including Hyundai-Kia Motor Group" },
    cta1: { ko: "서비스 알아보기", en: "Explore Services" },
    cta2: { ko: "문의하기", en: "Contact Us" },
    stats: [
      { n: "20+", ko: "업력 (년)", en: "Years Experience" },
      { n: "17", ko: "국가 네트워크", en: "Countries" },
      { n: "21", ko: "GAA 회원사", en: "Alliance Members" },
      { n: "4", ko: "글로벌 오피스", en: "Global Offices" },
    ],
  },
  nav: [
    { id: "home", ko: "홈", en: "Home" },
    { id: "about", ko: "회사소개", en: "About" },
    { id: "services", ko: "서비스", en: "Services" },
    { id: "portfolio", ko: "제품군", en: "Portfolio" },
    { id: "partners", ko: "파트너", en: "Partners" },
    { id: "contact", ko: "문의하기", en: "Contact" },
  ],
  about: {
    intro: { ko: "에이피글로벌아이앤씨(주)는 해외 자동차 부품 강소기업을 발굴하여 현대·기아 등 한국 자동차 OEM과 주요 티어 공급업체에 소개하고, 영업·개발·품질 전 과정을 지원하는 전문 에이전트입니다. 2003년 설립 이래 20년 이상의 업력과 OEM 내부 네트워크를 기반으로 해외 협력사의 한국시장 진출을 성공적으로 이끌어 왔습니다.", en: "AP Global Inc. is a specialized automotive agent headquartered in Seoul, Korea, dedicated to representing overseas automotive component suppliers in the Korean OEM market. Since 2003, we have been the trusted bridge between global Tier-1/2 suppliers and Hyundai-Kia Motor Group, providing end-to-end support from business development and engineering to quality and logistics." },
    mission: { ko: "세계 곳곳의 우수한 자동차 부품 기업을 발굴하여 한국 자동차 OEM과 연결하고, 양측의 성공적인 파트너십을 이끄는 것이 우리의 사명입니다.", en: "To connect exceptional global automotive component suppliers with Korean OEMs, facilitating successful partnerships that drive mutual growth." },
    vision: { ko: "자동차 산업의 글로벌 협력을 선도하는 가장 신뢰받는 에이전트가 되겠습니다.", en: "To be the most trusted automotive agent leading global collaboration in the automotive industry." },
    values: [
      { icon: "🔗", ko: "OEM 내부 네트워크", en: "Deep OEM Network", dko: "현대·기아 구매, 연구소, 품질 등 각 부서와 20년 이상 쌓아온 긴밀한 인적 네트워크를 보유하고 있습니다.", den: "Over 20 years of established relationships across Hyundai-Kia's purchasing, R&D, and quality departments." },
      { icon: "🎯", ko: "원스톱 지원 체계", en: "End-to-End Support", dko: "영업 활동부터 기술 대응, 프로젝트 관리, 물류·품질까지 한국시장 진출에 필요한 모든 서비스를 원스톱으로 제공합니다.", den: "From market entry strategy to technical liaison, project management, warehousing, and quality support — all under one roof." },
      { icon: "🌍", ko: "글로벌 얼라이언스", en: "Global Alliance", dko: "17개국 21개 회원사로 구성된 GAA의 한국 대표 회원사로서, 글로벌 정보를 실시간으로 활용합니다.", den: "As the Korean member of GAA — 21 specialized automotive agents across 17 countries — we offer unparalleled global intelligence." },
      { icon: "✅", ko: "검증된 실적", en: "Proven Track Record", dko: "Brembo, Scherdel, Vulcaflex 등 유럽·인도·미국의 유수 부품사들이 당사를 통해 한국시장에 성공적으로 진출했습니다.", den: "Leading suppliers including Brembo, Scherdel, and Sundaram-Clayton have successfully entered the Korean market through us." },
    ],
    history: [
      { y: "2003", ko: "에이피글로벌 설립, 서울 강남", en: "AP Global Inc. founded in Seoul" },
      { y: "2005", ko: "유럽 자동차 부품사 에이전시 사업 시작", en: "Started representing European suppliers" },
      { y: "2010", ko: "GAA 한국 회원사 가입", en: "Joined GAA as Korean member" },
      { y: "2015", ko: "인도, 북미 부품사 사업 확대", en: "Expanded to India & North America" },
      { y: "2018", ko: "독일 프랑크푸르트 지사 개설", en: "Opened Frankfurt office" },
      { y: "2020", ko: "수원 R&D 센터 설립", en: "Established Suwon R&D Center" },
      { y: "2024", ko: "전기차·경량화 부품 소싱 강화", en: "Strengthened EV & lightweight sourcing" },
    ],
    team: { ko: "총 8명의 전문 인력이 영업, R&D, 품질, 물류 분야에서 평균 15년 이상의 자동차 산업 경험을 보유하고 있습니다.", en: "Our team of 8 professionals brings an average of 15+ years of automotive industry experience." },
    org: { ko: ["CEO / 대표이사", "마케팅 & 트레이딩", "R&D", "마케팅", "트레이딩", "제품개발", "품질연구"], en: ["CEO", "Marketing & Trading", "R&D", "Marketing", "Trading", "Product Dev.", "Quality Research"] },
  },
  offices: [
    { ko: "본사", en: "Headquarters", cko: "서울", cen: "Seoul, Korea", ako: "서울 강남구 광평로280 로즈데일빌딩 1325호", aen: "#1325 Rosedale Bldg 280, Gwangpyeong-ro, Gangnam-gu, Seoul", ic: "🏢" },
    { ko: "R&D 센터", en: "R&D Center", cko: "수원", cen: "Suwon, Korea", ako: "경기도 수원시 영통구 도청로 10, A-813호", aen: "#A-813, Docheong-ro, Yeongtong-gu, Suwon-si", ic: "🔬" },
    { ko: "서울사무소", en: "Seoul Office", cko: "구로", cen: "Guro, Seoul", ako: "서울 구로구 부광로88 SKV1센터 B동 409호", aen: "#409 B Dong, SKV1 Center, Bugwang-ro, Guro-gu", ic: "🏗️" },
    { ko: "유럽사무소", en: "Europe Office", cko: "프랑크푸르트", cen: "Frankfurt, Germany", ako: "Am Hauptbahnhof 12, 60329 Frankfurt am Main", aen: "Am Hauptbahnhof 12, 60329 Frankfurt am Main, Germany", ic: "🇩🇪" },
  ],
  services: [
    { icon: "🤝", ko: "에이전시 (Representing)", en: "OEM Representation", dko: "현대·기아를 포함한 한국 OEM 구매부서에 대한 밀착 영업. RFQ 대응부터 수주까지 전 과정을 관리합니다.", den: "Your dedicated Korean branch — from initial introduction to RFQ response and award, we manage the complete business development cycle at Hyundai-Kia." },
    { icon: "🔬", ko: "R&D 대응", en: "R&D & Engineering", dko: "한국 OEM 연구소와의 기술 미팅, Guest Engineer 지원, APQP/PPAP/ISIR 프로세스를 체계적으로 관리합니다.", den: "We bridge your engineering team and Korean OEM R&D centers — technical meetings, Guest Engineer support, and APQP/PPAP/ISIR management." },
    { icon: "📊", ko: "시장조사 & 컨설팅", en: "Market Intelligence", dko: "한국 자동차 시장 동향, 경쟁사 분석, 가격 벤치마킹 등 깊이 있는 시장 정보를 제공합니다.", den: "In-depth Korean automotive market intelligence — competitive analysis, price benchmarking, and OEM purchasing strategy insights." },
    { icon: "🔗", ko: "SCM & 물류", en: "SCM & Logistics", dko: "웨어하우징, JIT 납품 서비스, 현지화 지원을 포함한 공급망 관리 서비스를 제공합니다.", den: "Local warehousing, JIT delivery, and localization support — seamless component flow from your factory to Korean assembly lines." },
    { icon: "✅", ko: "품질 관리", en: "Quality Management", dko: "SQE 대응, 클레임 처리, 품질 개선 활동 등 한국 OEM의 엄격한 품질 기준에 맞춘 지원을 제공합니다.", den: "SQE liaison, claim management, and continuous improvement — ensuring your products meet Hyundai-Kia's exacting quality standards." },
    { icon: "🌐", ko: "수출 & 트레이딩", en: "Trading & Export", dko: "자동차 부품류, 양산용 금형, 알루미늄 주조용 도형제 등의 수출입 트레이딩 서비스.", den: "Export trading of automotive components, serial production molds, and anti-shrinkage moldings for aluminum casting." },
  ],
  process: [
    { n: "01", ko: "시장분석", en: "Market Analysis", dko: "한국 시장 현황 파악 및 진입 전략 수립", den: "Analyze Korean market & develop entry strategy" },
    { n: "02", ko: "OEM 소개", en: "OEM Introduction", dko: "구매 담당자 직접 소개 및 RFQ 대응", den: "Direct introduction to purchasing & RFQ support" },
    { n: "03", ko: "기술 개발", en: "Engineering", dko: "연구소 미팅, APQP/PPAP 관리", den: "R&D meetings & APQP/PPAP management" },
    { n: "04", ko: "양산 지원", en: "Production", dko: "물류, 품질, 클레임 등 지속 지원", den: "Ongoing logistics, quality & claim support" },
  ],
  products: [
    { ko: "자동차용 스프링", en: "Automotive Springs", rko: "유럽", ren: "Europe", s: "Scherdel" },
    { ko: "플러쉬 몰딩", en: "Flush Molding (W/S Glass)", rko: "유럽", ren: "Europe", s: "Elkamet" },
    { ko: "브레이크 시스템", en: "Brake Systems", rko: "유럽", ren: "Europe", s: "Brembo" },
    { ko: "아이솔레이터 & 커플링", en: "Isolators & Steering Coupling", rko: "유럽", ren: "Europe", s: "SGF / Vulcaflex" },
    { ko: "차량 컴포트 시스템", en: "Car Comfort Systems", rko: "유럽", ren: "Europe", s: "KIPP" },
    { ko: "베어링 & 정밀부품", en: "Bearings & Precision Parts", rko: "유럽", ren: "Europe", s: "Rollax" },
    { ko: "외장 트림", en: "Exterior Trim Parts", rko: "유럽", ren: "Europe", s: "Gerhardi" },
    { ko: "공조 시스템 (HVAC)", en: "HVAC Systems", rko: "인도", ren: "India", s: "Subros" },
    { ko: "알루미늄 다이캐스팅", en: "Aluminum Diecasting", rko: "인도", ren: "India", s: "Sundaram-Clayton" },
    { ko: "스타터 / 알터네이터", en: "Starter / Alternator / Wiper", rko: "인도", ren: "India", s: "Lucas-TVS" },
    { ko: "엔진블록 & 미션", en: "Engine Blocks & Transmission", rko: "인도", ren: "India", s: "Rico" },
    { ko: "자동차 전장품", en: "Electrical Components", rko: "인도", ren: "India", s: "Satven" },
    { ko: "버큠 부스터", en: "Brake Vacuum Booster", rko: "북미", ren: "N. America", s: "Nyloncraft" },
    { ko: "소결 부품", en: "Sintered Metal Parts", rko: "북미", ren: "N. America", s: "Sintered Specialties" },
  ],
  customers: [
    { ko: "현대자동차", en: "Hyundai Motor", t: "OEM" },
    { ko: "기아", en: "Kia", t: "OEM" },
    { ko: "현대모비스", en: "Hyundai Mobis", t: "Tier 1" },
    { ko: "현대트랜시스", en: "Hyundai Transys", t: "Tier 1" },
    { ko: "현대위아", en: "Hyundai WIA", t: "Tier 1" },
    { ko: "만도", en: "HL Mando", t: "Tier 1" },
    { ko: "일진", en: "ILJIN", t: "Tier 1" },
    { ko: "서한그룹", en: "Seohan Group", t: "Tier 1" },
    { ko: "명화공업", en: "Myunghwa", t: "Tier 1" },
    { ko: "계양전기", en: "Keyyang", t: "Tier 1" },
  ],
  gaa: [
    { co: "HMI", ct: "Germany", ci: "Munich", f: "BMW" },
    { co: "BBP", ct: "Germany", ci: "Stuttgart", f: "Mercedes, Porsche" },
    { co: "VEMA", ct: "Germany", ci: "Wolfsburg", f: "Volkswagen" },
    { co: "Ooka", ct: "Japan", ci: "Nagoya", f: "Toyota" },
    { co: "Lynch", ct: "USA", ci: "Troy, MI", f: "US Big 3" },
    { co: "AP Global", ct: "Korea", ci: "Seoul", f: "Hyundai-Kia" },
  ],
  contactTypes: [
    { ko: "영업 / 수주 문의", en: "Business Development" },
    { ko: "품질 지원", en: "Quality Support" },
    { ko: "소싱 / 부품 발굴", en: "Sourcing & Parts" },
    { ko: "R&D 협력", en: "R&D Collaboration" },
    { ko: "일반 문의", en: "General Inquiry" },
  ],
};

/* ═══════════ HELPERS ═══════════ */
function useVis(th = 0.1) {
  const r = useRef(null);
  const [v, set] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { set(true); o.disconnect(); } }, { threshold: th });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [r, v];
}
function Fade({ children, d = 0, cl = "" }) {
  const [r, v] = useVis();
  return <div ref={r} className={cl} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `all .6s cubic-bezier(.22,1,.36,1) ${d}s` }}>{children}</div>;
}

/* ═══════════ JSON CMS PARSER ═══════════ */
function parseJSON(text) {
  try { return JSON.parse(text); } catch { return null; }
}

/* ═══════════ STYLES ═══════════ */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
:root{--n:#0A1628;--n2:#0F1D32;--n3:#162544;--b:#0284C7;--b2:#38BDF8;--ac:#10B981;--w:#FFF;--f:#F8FAFC;--g:#E2E8F0;--t:#0F172A;--tm:#64748B}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans','Noto Sans KR',sans-serif;color:var(--t);background:var(--w);overflow-x:hidden;-webkit-font-smoothing:antialiased}
.km{font-family:'Noto Sans KR','Plus Jakarta Sans',sans-serif}
.nv{position:fixed;top:0;left:0;right:0;z-index:200;transition:all .35s}
.nv.s{background:rgba(10,22,40,.96);backdrop-filter:blur(20px);box-shadow:0 1px 32px rgba(0,0,0,.15)}
.nv-i{max-width:1240px;margin:0 auto;padding:13px 28px;display:flex;align-items:center;justify-content:space-between}
.lg{font-weight:800;font-size:19px;color:var(--w);cursor:pointer;letter-spacing:-.3px}.lg b{color:var(--ac)}
.nl{display:flex;gap:4px;align-items:center}
.nl button{background:none;border:none;color:rgba(255,255,255,.6);font:500 12.5px/1 'Plus Jakarta Sans','Noto Sans KR',sans-serif;padding:7px 13px;border-radius:7px;cursor:pointer;transition:all .2s;white-space:nowrap}
.nl button:hover,.nl button.a{color:var(--w);background:rgba(255,255,255,.07)}
.lb{background:rgba(16,185,129,.12)!important;color:var(--ac)!important;font-weight:700!important;border:1px solid rgba(16,185,129,.2)!important;font-size:10.5px!important;letter-spacing:.5px}
.cb{background:rgba(255,255,255,.05)!important;border:1px solid rgba(255,255,255,.1)!important;font-size:10.5px!important;position:relative;overflow:hidden}
.cb input{position:absolute;inset:0;opacity:0;cursor:pointer}
.mb{display:none;background:none;border:none;color:var(--w);font-size:24px;cursor:pointer}
.mn{position:fixed;inset:0;background:rgba(5,10,20,.98);backdrop-filter:blur(20px);z-index:250;display:flex;flex-direction:column;justify-content:center;padding:0 40px}
.mn button{background:none;border:none;color:var(--w);font:600 24px/1 inherit;padding:16px 0;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;text-align:left}
.mn button:hover{color:var(--ac)}
.mc{position:absolute;top:20px;right:28px;background:none;border:none;color:var(--w);font-size:28px;cursor:pointer}
.hr{position:relative;min-height:100vh;display:flex;align-items:center;background:linear-gradient(155deg,#040B18 0%,var(--n) 35%,var(--n2) 65%,var(--n3) 100%);overflow:hidden}
.hr-m{position:absolute;inset:0;opacity:.035;background-image:linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px);background-size:52px 52px}
.hr-o{position:absolute;border-radius:50%;filter:blur(90px);animation:ob 14s ease-in-out infinite}
.hr-oa{width:480px;height:480px;background:rgba(2,132,199,.1);top:-80px;right:-40px}
.hr-ob{width:360px;height:360px;background:rgba(16,185,129,.06);bottom:-80px;left:-40px;animation-delay:-5s}
@keyframes ob{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-25px)}}
.hr-c{position:relative;z-index:2;max-width:1240px;margin:0 auto;padding:150px 28px 90px;width:100%}
.hr-b{display:inline-flex;align-items:center;gap:7px;background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.18);padding:5px 16px;border-radius:100px;font-size:12px;color:var(--ac);font-weight:600;margin-bottom:24px}
.hr-d{width:5px;height:5px;border-radius:50%;background:var(--ac);animation:p 2s infinite}
@keyframes p{0%,100%{opacity:1}50%{opacity:.3}}
.hr h1{font-size:clamp(34px,5.5vw,64px);font-weight:800;color:var(--w);line-height:1.1;letter-spacing:-1.5px;max-width:720px;margin-bottom:22px;white-space:pre-line}
.hr h1 em{color:var(--ac);font-style:normal}
.hr-s{font-size:16.5px;color:rgba(255,255,255,.45);max-width:540px;line-height:1.7;margin-bottom:40px;white-space:pre-line;font-weight:300}
.hr-bt{display:flex;gap:12px;flex-wrap:wrap}
.bp{display:inline-flex;align-items:center;gap:7px;background:var(--ac);color:var(--n);padding:14px 28px;border-radius:11px;border:none;font:600 14px/1 inherit;cursor:pointer;transition:all .3s}
.bp:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(16,185,129,.25)}
.bs{display:inline-flex;align-items:center;gap:7px;background:transparent;color:var(--w);padding:14px 28px;border-radius:11px;border:1px solid rgba(255,255,255,.15);font:600 14px/1 inherit;cursor:pointer;transition:all .3s}
.bs:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.25)}
.hr-st{display:flex;gap:36px;margin-top:64px;padding-top:36px;border-top:1px solid rgba(255,255,255,.05);flex-wrap:wrap}
.hs .sn{font-size:34px;font-weight:800;color:var(--w)}
.hs .sl{font-size:12px;color:rgba(255,255,255,.3);margin-top:2px;font-weight:500}
.sc{padding:100px 28px;max-width:1240px;margin:0 auto}
.sd{background:var(--n)}.sa{background:var(--f)}
.sh{text-align:center;margin-bottom:56px}
.st{font-size:11px;text-transform:uppercase;letter-spacing:2.5px;color:var(--b2);font-weight:700;margin-bottom:12px}
.stt{font-size:clamp(28px,3.5vw,42px);font-weight:800;letter-spacing:-1.2px;line-height:1.15}
.stt.dk{color:var(--t)}.stt.lt{color:var(--w)}
.ss{font-size:15.5px;color:var(--tm);max-width:560px;margin:12px auto 0;line-height:1.65}
.ss.lt{color:rgba(255,255,255,.4)}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.cd{padding:32px 26px;border-radius:14px;transition:all .3s;position:relative;overflow:hidden}
.cl{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.05)}
.cl:hover{background:rgba(16,185,129,.03);border-color:rgba(16,185,129,.12);transform:translateY(-2px)}
.cw{background:var(--w);border:1px solid var(--g)}
.cw:hover{transform:translateY(-3px);box-shadow:0 10px 32px rgba(0,0,0,.05);border-color:var(--b2)}
.ci{font-size:30px;margin-bottom:14px}.ct{font-size:17px;font-weight:700;margin-bottom:8px}
.ct.lt{color:var(--w)}.ct.dk{color:var(--t)}
.cx{font-size:13.5px;line-height:1.7}.cx.lt{color:rgba(255,255,255,.4)}.cx.dk{color:var(--tm)}
.tl{position:relative;padding-left:28px}
.tl::before{content:'';position:absolute;left:7px;top:6px;bottom:6px;width:2px;background:linear-gradient(to bottom,var(--b2),var(--ac))}
.ti{position:relative;margin-bottom:22px;padding-left:18px}
.ti::before{content:'';position:absolute;left:-25px;top:5px;width:10px;height:10px;border-radius:50%;background:var(--b2);border:2px solid var(--w);box-shadow:0 0 0 3px rgba(56,189,248,.12)}
.ty{font-size:12.5px;font-weight:700;color:var(--b2)}.tx{font-size:13.5px;color:var(--tm);margin-top:2px}
.oc{display:flex;flex-direction:column;align-items:center;gap:14px}
.ob{padding:10px 22px;background:var(--n);color:var(--w);border-radius:9px;font-weight:700;font-size:13px;text-align:center}
.ob.tp{background:linear-gradient(135deg,var(--b),var(--b2));padding:14px 28px;font-size:15px}
.or{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.os{padding:9px 18px;background:var(--f);border:1px solid var(--g);border-radius:7px;font-size:12.5px;font-weight:600;color:var(--t)}
.pr{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
.ps{text-align:center;padding:28px 16px;position:relative}
.pn{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--b),var(--ac));color:var(--w);display:inline-flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;margin-bottom:14px}
.pa{position:absolute;right:-10px;top:44px;font-size:18px;color:var(--g);z-index:2}
.pf{display:flex;gap:7px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.pf button{padding:7px 18px;border-radius:7px;border:1px solid var(--g);background:var(--w);font:500 12.5px/1 inherit;cursor:pointer;transition:all .2s;color:var(--tm)}
.pf button.on{background:var(--n);color:var(--w);border-color:var(--n)}
.pc{padding:22px;border-radius:12px;background:var(--w);border:1px solid var(--g);transition:all .3s}
.pc:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.05)}
.pt{display:inline-block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;padding:3px 9px;border-radius:5px;margin-bottom:10px}
.te{background:rgba(56,189,248,.08);color:var(--b2)}.ti2{background:rgba(245,158,11,.08);color:#D97706}.tn{background:rgba(16,185,129,.08);color:#059669}
.pm{font-size:14.5px;font-weight:700;color:var(--t);margin-bottom:3px}.pp{font-size:12px;color:var(--tm)}
.gb{background:linear-gradient(135deg,var(--n),var(--n3));border-radius:18px;padding:48px;position:relative;overflow:hidden;margin-bottom:48px}
.gb h3{font-size:22px;font-weight:800;color:var(--w);margin-bottom:12px}
.gb p{font-size:14.5px;color:rgba(255,255,255,.5);line-height:1.7;max-width:620px;margin-bottom:28px}
.gc{display:flex;gap:8px;flex-wrap:wrap}
.gp{padding:9px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:7px}
.gp strong{font-size:12.5px;color:var(--w);display:block}.gp span{font-size:10.5px;color:rgba(255,255,255,.3)}
.cg{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
.cc{padding:13px 22px;border-radius:10px;background:var(--f);border:1px solid var(--g);font-weight:700;font-size:13px;color:var(--t);transition:all .25s;cursor:default}
.cc:hover{background:var(--n);color:var(--w);transform:scale(1.03)}
.cc .cr{font-size:10px;font-weight:600;color:var(--b2);display:block;margin-top:2px}
.cw2{max-width:660px;margin:0 auto}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.fg{display:flex;flex-direction:column;gap:4px;margin-bottom:14px}
.fg label{font-size:12px;font-weight:600;color:var(--t);letter-spacing:.2px}
.fg input,.fg select,.fg textarea{padding:12px 15px;border-radius:9px;border:1.5px solid var(--g);font:400 14px/1.4 inherit;color:var(--t);outline:none;transition:all .3s;background:var(--w);resize:vertical}
.fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--b2);box-shadow:0 0 0 3px rgba(56,189,248,.07)}
.fb{padding:15px 36px;background:var(--n);color:var(--w);border:none;border-radius:11px;font:600 14.5px/1 inherit;cursor:pointer;transition:all .3s;display:block;margin:6px auto 0}
.fb:hover{background:var(--b2);transform:translateY(-2px);box-shadow:0 6px 20px rgba(56,189,248,.2)}
.fok{text-align:center;padding:24px;border-radius:11px;background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.12);color:#059669;font-weight:600;font-size:14.5px}
.tt{position:fixed;top:76px;right:28px;z-index:300;background:var(--n);color:var(--ac);padding:14px 24px;border-radius:11px;font-size:13.5px;font-weight:600;box-shadow:0 10px 36px rgba(0,0,0,.3);animation:si .35s ease}
@keyframes si{from{transform:translateX(80px);opacity:0}to{transform:translateX(0);opacity:1}}
.ft{background:#040B18;padding:48px 28px 32px}
.fi{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:36px;align-items:start}
.fl{font-weight:800;font-size:18px;color:var(--w);margin-bottom:6px}.fl b{color:var(--ac)}
.fs{font-size:12.5px;color:rgba(255,255,255,.2);font-style:italic;margin-bottom:14px}
.fc{font-size:12.5px;color:rgba(255,255,255,.3);line-height:1.8}
.fk{display:flex;flex-direction:column;gap:6px}
.fk button{background:none;border:none;color:rgba(255,255,255,.35);font:400 12.5px/1 inherit;cursor:pointer;text-align:left;padding:0;transition:color .2s}
.fk button:hover{color:var(--ac)}
.fp{font-size:11.5px;color:rgba(255,255,255,.12);text-align:right;align-self:end}
.cta-b{background:linear-gradient(135deg,var(--b) 0%,var(--ac) 100%);padding:72px 28px;text-align:center}
.cta-b h2{font-size:clamp(22px,3vw,30px);font-weight:800;color:var(--w);margin-bottom:14px;letter-spacing:-.5px}
.cta-b p{font-size:15px;color:rgba(255,255,255,.65);margin-bottom:28px}
@media(max-width:1024px){.g3{grid-template-columns:repeat(2,1fr)}.g4{grid-template-columns:repeat(3,1fr)}.g2{grid-template-columns:1fr}.fi{grid-template-columns:1fr 1fr}.pr{grid-template-columns:repeat(2,1fr)}.pa{display:none}}
@media(max-width:768px){.nl{display:none}.mb{display:block}.hr h1{font-size:30px;letter-spacing:-.8px}.hr-c{padding:110px 20px 70px}.hr-st{gap:20px}.sc{padding:70px 20px}.g3,.g4,.g2{grid-template-columns:1fr}.fr{grid-template-columns:1fr}.gb{padding:32px 20px}.fi{grid-template-columns:1fr;text-align:center}.fk{align-items:center}.fp{text-align:center}.pr{grid-template-columns:1fr 1fr}.as{grid-template-columns:1fr}}
@media(max-width:480px){.hr-st{flex-direction:column;gap:14px}.g4{grid-template-columns:1fr 1fr}}
.as{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.ph{min-height:48vh}
`;

/* ═══════════ MAIN ═══════════ */
export default function App() {
  const [lang, setLang] = useState("ko");
  const [pg, setPg] = useState("home");
  const [sc, setSc] = useState(false);
  const [mo, setMo] = useState(false);
  const [D, setD] = useState(D0);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ n: "", c: "", e: "", p: "", t: "", m: "" });
  const [ok, setOk] = useState(false);

  useEffect(() => { const f = () => setSc(window.scrollY > 50); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);

  const go = (p) => { setPg(p); setMo(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const L = (o) => typeof o === "string" ? o : (o?.[lang] || o?.en || "");

  // JSON CMS upload
  const handleCMS = useCallback((e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = parseJSON(ev.target.result);
        if (parsed) {
          setD(prev => ({ ...prev, ...parsed }));
          setToast("✅ JSON 데이터가 적용되었습니다!");
        } else { setToast("❌ JSON 파싱 실패"); }
      } catch (err) { setToast("❌ " + err.message); }
      setTimeout(() => setToast(""), 3000);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const submit = () => { if (!form.n || !form.e) return; setOk(true); setTimeout(() => { setOk(false); setForm({ n: "", c: "", e: "", p: "", t: "", m: "" }); }, 3500); };

  /* ── Nav ── */
  const Nav = () => (
    <>
      <nav className={`nv ${sc ? "s" : ""}`}><div className="nv-i">
        <div className="lg" onClick={() => go("home")}>AP<b>Global</b></div>
        <div className="nl">
          {D.nav.map(n => <button key={n.id} className={pg === n.id ? "a" : ""} onClick={() => go(n.id)}>{L(n)}</button>)}
          <button className="lb" onClick={() => setLang(l => l === "ko" ? "en" : "ko")}>{lang === "ko" ? "ENG" : "한국어"}</button>
          <button className="cb">📄 CMS<input type="file" accept=".json" onChange={handleCMS} title="Upload JSON CMS" /></button>
        </div>
        <button className="mb" onClick={() => setMo(true)}>☰</button>
      </div></nav>
      {mo && <div className="mn"><button className="mc" onClick={() => setMo(false)}>✕</button>
        {D.nav.map(n => <button key={n.id} onClick={() => go(n.id)}>{L(n)}</button>)}
        <button onClick={() => { setLang(l => l === "ko" ? "en" : "ko"); setMo(false); }} style={{ color: "var(--ac)" }}>{lang === "ko" ? "ENG" : "한국어"}</button>
      </div>}
    </>
  );

  const Ft = () => (
    <footer className="ft"><div className="fi">
      <div><div className="fl">AP<b>Global</b> Inc.</div><div className="fs">Your trust, Our commitment to Promising Future!</div><div className="fc">📞 +82-2-6205-1325<br />✉️ info@apglobal.co.kr</div></div>
      <div><div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>{lang === "ko" ? "바로가기" : "Quick Links"}</div><div className="fk">{D.nav.map(n => <button key={n.id} onClick={() => go(n.id)}>{L(n)}</button>)}</div></div>
      <div className="fp">© 2025 AP Global Inc.<br />All rights reserved.</div>
    </div></footer>
  );

  const CF = () => (
    <div className="cw2">{ok ? <div className="fok">{lang === "ko" ? "감사합니다! 문의가 접수되었습니다." : "Thank you! Your inquiry has been submitted."}</div> : <>
      <div className="fr"><div className="fg"><label>{lang === "ko" ? "성함" : "Name"}</label><input value={form.n} onChange={e => setForm(f => ({ ...f, n: e.target.value }))} /></div>
      <div className="fg"><label>{lang === "ko" ? "회사명" : "Company"}</label><input value={form.c} onChange={e => setForm(f => ({ ...f, c: e.target.value }))} /></div></div>
      <div className="fr"><div className="fg"><label>{lang === "ko" ? "이메일" : "Email"}</label><input type="email" value={form.e} onChange={e => setForm(f => ({ ...f, e: e.target.value }))} /></div>
      <div className="fg"><label>{lang === "ko" ? "연락처" : "Phone"}</label><input value={form.p} onChange={e => setForm(f => ({ ...f, p: e.target.value }))} /></div></div>
      <div className="fg"><label>{lang === "ko" ? "문의 유형" : "Inquiry Type"}</label><select value={form.t} onChange={e => setForm(f => ({ ...f, t: e.target.value }))}><option value="">—</option>{D.contactTypes.map((t, i) => <option key={i} value={L(t)}>{L(t)}</option>)}</select></div>
      <div className="fg"><label>{lang === "ko" ? "메시지" : "Message"}</label><textarea rows={4} value={form.m} onChange={e => setForm(f => ({ ...f, m: e.target.value }))} /></div>
      <button className="fb" onClick={submit}>{lang === "ko" ? "문의 보내기" : "Send Inquiry"}</button>
    </>}</div>
  );

  /* PAGE HEADER */
  const PH = ({ tag, title, sub }) => (
    <section className="hr ph"><div className="hr-m" /><div className="hr-o hr-oa" /><div className="hr-o hr-ob" />
      <div className="hr-c" style={{ paddingTop: 130, paddingBottom: 50 }}>
        <Fade><div className="st" style={{ color: "var(--ac)" }}>{tag}</div></Fade>
        <Fade d={.1}><h1 style={{ fontSize: "clamp(30px,4.5vw,48px)" }}>{title}</h1></Fade>
        {sub && <Fade d={.2}><p className="hr-s">{sub}</p></Fade>}
      </div>
    </section>
  );

  /* ════ HOME ════ */
  const Home = () => {
    const tLines = L(D.hero.title).split("\n");
    const last = tLines.pop();
    return <>
      <section className="hr"><div className="hr-m" /><div className="hr-o hr-oa" /><div className="hr-o hr-ob" />
        <div className="hr-c">
          <Fade><div className="hr-b"><div className="hr-d" />{L(D.hero.badge)}</div></Fade>
          <Fade d={.1}><h1>{tLines.map((l, i) => <span key={i}>{l}<br /></span>)}<em>{last}</em></h1></Fade>
          <Fade d={.22}><p className="hr-s">{L(D.hero.subtitle)}</p></Fade>
          <Fade d={.33}><div className="hr-bt"><button className="bp" onClick={() => go("services")}>{L(D.hero.cta1)} →</button><button className="bs" onClick={() => go("contact")}>{L(D.hero.cta2)}</button></div></Fade>
          <Fade d={.44}><div className="hr-st">{D.hero.stats.map((s, i) => <div className="hs" key={i}><div className="sn">{s.n}</div><div className="sl">{L(s)}</div></div>)}</div></Fade>
        </div>
      </section>
      <section className="sa"><div className="sc">
        <Fade><div className="sh"><div className="st">{lang === "ko" ? "소개" : "ABOUT"}</div><div className="stt dk">{lang === "ko" ? "회사소개" : "About AP Global"}</div></div></Fade>
        <Fade><p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--tm)", maxWidth: 780, margin: "0 auto 44px", textAlign: "center" }}>{L(D.about.intro)}</p></Fade>
        <div className="g4">{D.about.values.map((v, i) => <Fade key={i} d={i * .07}><div className="cd cw"><div className="ci">{v.icon}</div><div className="ct dk">{L(v)}</div><div className="cx dk">{lang === "ko" ? v.dko : v.den}</div></div></Fade>)}</div>
        <Fade><div style={{ textAlign: "center", marginTop: 36 }}><button className="bp" onClick={() => go("about")} style={{ background: "var(--n)", color: "var(--w)" }}>{lang === "ko" ? "더 알아보기 →" : "Learn More →"}</button></div></Fade>
      </div></section>
      <div className="sd"><div className="sc">
        <Fade><div className="sh"><div className="st">{lang === "ko" ? "서비스" : "SERVICES"}</div><div className="stt lt">{lang === "ko" ? "서비스 & 사업영역" : "Services & Solutions"}</div><p className="ss lt">{lang === "ko" ? "컨셉부터 양산까지, 한국시장 진출의 모든 것" : "Complete Korean Market Entry Support"}</p></div></Fade>
        <div className="g3">{D.services.map((s, i) => <Fade key={i} d={i * .05}><div className="cd cl"><div className="ci">{s.icon}</div><div className="ct lt">{L(s)}</div><div className="cx lt">{lang === "ko" ? s.dko : s.den}</div></div></Fade>)}</div>
      </div></div>
      <div className="cta-b"><Fade>
        <h2>{lang === "ko" ? "한국 자동차 시장 진출, 지금 시작하세요" : "Start Your Korean Market Journey Today"}</h2>
        <p>{lang === "ko" ? "20년 이상의 OEM 네트워크가 성공을 지원합니다" : "20+ years of OEM network ready to support your success"}</p>
        <button className="bs" onClick={() => go("contact")} style={{ borderColor: "rgba(255,255,255,.35)" }}>{lang === "ko" ? "무료 상담 신청 →" : "Request Consultation →"}</button>
      </Fade></div>
    </>;
  };

  /* ════ ABOUT ════ */
  const About = () => <>
    <PH tag={lang === "ko" ? "회사소개" : "ABOUT US"} title={lang === "ko" ? "에이피글로벌을 소개합니다" : "Discover AP Global"} sub={lang === "ko" ? "한국 자동차 OEM과 해외 부품 강소기업의 가교" : "Your Trusted Bridge to Korean Automotive OEMs"} />
    <section className="sa"><div className="sc"><div className="as">
      <div>
        <Fade><p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--tm)", marginBottom: 28 }}>{L(D.about.intro)}</p></Fade>
        <Fade d={.08}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
          <div style={{ padding: 24, borderRadius: 12, background: "linear-gradient(135deg, var(--n), var(--n3))" }}><div style={{ fontSize: 12, fontWeight: 700, color: "var(--ac)", marginBottom: 6 }}>{lang === "ko" ? "미션" : "Mission"}</div><div style={{ fontSize: 13.5, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>{L(D.about.mission)}</div></div>
          <div style={{ padding: 24, borderRadius: 12, background: "linear-gradient(135deg, var(--b), var(--b2))" }}><div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.75)", marginBottom: 6 }}>{lang === "ko" ? "비전" : "Vision"}</div><div style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)", lineHeight: 1.7 }}>{L(D.about.vision)}</div></div>
        </div></Fade>
        <Fade d={.12}><h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lang === "ko" ? "전문가 팀" : "Our Team"}</h3><p style={{ fontSize: 14.5, color: "var(--tm)", lineHeight: 1.7, marginBottom: 28 }}>{L(D.about.team)}</p>
        <div className="oc"><div className="ob tp">{D.about.org[lang][0]}</div><div className="or"><div className="ob">{D.about.org[lang][1]}</div><div className="ob">{D.about.org[lang][2]}</div></div><div className="or">{D.about.org[lang].slice(3).map((d, i) => <div className="os" key={i}>{d}</div>)}</div></div></Fade>
      </div>
      <div>
        <Fade><h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{lang === "ko" ? "연혁" : "History"}</h3>
          <div className="tl">{D.about.history.map((h, i) => <div className="ti" key={i}><div className="ty">{h.y}</div><div className="tx">{L(h)}</div></div>)}</div>
        </Fade>
        <Fade d={.08}><h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{lang === "ko" ? "사무소" : "Offices"}</h3>
          {D.offices.map((o, i) => <div key={i} style={{ padding: "15px 18px", background: "var(--w)", border: "1px solid var(--g)", borderRadius: 10, marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}><span>{o.ic}</span><strong style={{ fontSize: 14 }}>{L(o)}</strong><span style={{ fontSize: 11.5, color: "var(--b2)", fontWeight: 600 }}>{lang === "ko" ? o.cko : o.cen}</span></div>
            <div style={{ fontSize: 12.5, color: "var(--tm)" }}>{lang === "ko" ? o.ako : o.aen}</div>
          </div>)}
        </Fade>
      </div>
    </div></div></section>
  </>;

  /* ════ SERVICES ════ */
  const Services = () => <>
    <PH tag={lang === "ko" ? "서비스" : "SERVICES"} title={lang === "ko" ? "서비스 & 사업영역" : "Services & Solutions"} sub={lang === "ko" ? "컨셉부터 양산까지, 한국시장 진출의 모든 것" : "Complete Korean Market Entry Support"} />
    <section className="sa"><div className="sc">
      <Fade><div className="sh"><div className="st">{lang === "ko" ? "프로세스" : "PROCESS"}</div><div className="stt dk">{lang === "ko" ? "우리의 프로세스" : "Our Process"}</div></div></Fade>
      <div className="pr">{D.process.map((p, i) => <Fade key={i} d={i * .08}><div className="ps"><div className="pn">{p.n}</div>{i < D.process.length - 1 && <div className="pa">→</div>}<div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "var(--t)" }}>{L(p)}</div><div style={{ fontSize: 13, color: "var(--tm)", lineHeight: 1.6 }}>{lang === "ko" ? p.dko : p.den}</div></div></Fade>)}</div>
    </div></section>
    <div className="sd"><div className="sc">
      <Fade><div className="sh"><div className="st">{lang === "ko" ? "상세 서비스" : "EXPERTISE"}</div><div className="stt lt">{lang === "ko" ? "전문 서비스 영역" : "Our Expertise"}</div></div></Fade>
      <div className="g2">{D.services.map((s, i) => <Fade key={i} d={i * .05}><div className="cd cl" style={{ padding: "36px 30px" }}><div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}><div className="ci" style={{ fontSize: 36, flexShrink: 0 }}>{s.icon}</div><div><div className="ct lt" style={{ fontSize: 18, marginBottom: 10 }}>{L(s)}</div><div className="cx lt" style={{ fontSize: 14, lineHeight: 1.75 }}>{lang === "ko" ? s.dko : s.den}</div></div></div></div></Fade>)}</div>
    </div></div>
    <div className="cta-b"><Fade><h2>{lang === "ko" ? "서비스에 대해 더 궁금하신가요?" : "Want to learn more?"}</h2><button className="bs" onClick={() => go("contact")} style={{ borderColor: "rgba(255,255,255,.35)" }}>{lang === "ko" ? "문의하기 →" : "Contact Us →"}</button></Fade></div>
  </>;

  /* ════ PORTFOLIO ════ */
  const Portfolio = () => {
    const [fl, setFl] = useState("all");
    const regs = [...new Set(D.products.map(p => p.ren))];
    const filt = fl === "all" ? D.products : D.products.filter(p => p.ren === fl);
    return <>
      <PH tag={lang === "ko" ? "제품군" : "PORTFOLIO"} title={lang === "ko" ? "제품 포트폴리오" : "Product Portfolio"} sub={lang === "ko" ? "유럽, 인도, 북미의 우수 자동차 부품" : "Quality automotive components from Europe, India & North America"} />
      <section className="sa"><div className="sc">
        <div className="pf"><button className={fl === "all" ? "on" : ""} onClick={() => setFl("all")}>{lang === "ko" ? "전체" : "All"}</button>{regs.map(r => <button key={r} className={fl === r ? "on" : ""} onClick={() => setFl(r)}>{r}</button>)}</div>
        <div className="g4">{filt.map((p, i) => <Fade key={`${fl}-${i}`} d={i * .03}><div className="pc"><div className={`pt ${p.ren === "Europe" ? "te" : p.ren === "India" ? "ti2" : "tn"}`}>{lang === "ko" ? p.rko : p.ren}</div><div className="pm">{L(p)}</div><div className="pp">{p.s}</div></div></Fade>)}</div>
      </div></section>
    </>;
  };

  /* ════ PARTNERS ════ */
  const Partners = () => <>
    <PH tag={lang === "ko" ? "파트너" : "PARTNERS"} title={lang === "ko" ? "파트너 & 네트워크" : "Partners & Network"} />
    <section className="sa"><div className="sc">
      <Fade><div className="gb"><h3>Global Alliance Automotive (GAA)</h3><p>{lang === "ko" ? "에이피글로벌은 GAA의 한국 대표 회원사입니다. GAA는 17개국 21개 회원사로 구성된 자동차 부품 에이전트 연합체로, 각 회원사는 평균 20년 이상의 업력을 보유한 전문가 집단입니다." : "AP Global is the Korean member of GAA — a network of 21 automotive agents across 17 countries. Each member averages 20+ years of industry expertise."}</p><div className="gc">{D.gaa.map((g, i) => <div className="gp" key={i}><strong>{g.ci}, {g.ct}</strong><span>{g.co} — {g.f}</span></div>)}</div></div></Fade>
      <Fade><div className="sh"><div className="st">{lang === "ko" ? "고객사" : "CUSTOMERS"}</div><div className="stt dk">{lang === "ko" ? "주요 고객사" : "Key Customers"}</div></div><div className="cg">{D.customers.map((c, i) => <div className="cc" key={i}>{L(c)}<span className="cr">{c.t}</span></div>)}</div></Fade>
      <Fade><div style={{ marginTop: 56 }}><div className="sh"><div className="st">{lang === "ko" ? "공급사" : "SUPPLIERS"}</div><div className="stt dk">{lang === "ko" ? "취급 해외 공급사" : "Our Principals"}</div></div>
        {["Europe", "India", "N. America"].map(r => { const sups = [...new Set(D.products.filter(p => p.ren === r).map(p => p.s).filter(s => s !== "Various"))]; return <div key={r} style={{ marginBottom: 24 }}><div style={{ fontSize: 12, fontWeight: 700, color: "var(--b2)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{r}</div><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{sups.map((s, i) => <div key={i} style={{ padding: "9px 18px", background: "var(--w)", border: "1px solid var(--g)", borderRadius: 7, fontSize: 13.5, fontWeight: 500 }}>{s}</div>)}</div></div>; })}
      </div></Fade>
    </div></section>
  </>;

  /* ════ CONTACT ════ */
  const Contact = () => <>
    <PH tag={lang === "ko" ? "문의하기" : "CONTACT"} title={lang === "ko" ? "문의하기" : "Contact Us"} sub={lang === "ko" ? "자동차 솔루션에 대해 문의해 주세요" : "Let's discuss your Korean market strategy"} />
    <section className="sa"><div className="sc">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, maxWidth: 960, margin: "0 auto" }}>
        <Fade><div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>{lang === "ko" ? "연락처" : "Contact Info"}</h3>
          {D.offices.map((o, i) => <div key={i} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid var(--g)" }}><div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 3 }}><span>{o.ic}</span><strong style={{ fontSize: 14 }}>{L(o)}</strong></div><div style={{ fontSize: 12.5, color: "var(--tm)" }}>{lang === "ko" ? o.ako : o.aen}</div></div>)}
          <div style={{ marginTop: 20, fontSize: 13.5, color: "var(--tm)", lineHeight: 2 }}>📞 +82-2-6205-1325<br />✉️ info@apglobal.co.kr</div>
        </div></Fade>
        <Fade d={.1}><CF /></Fade>
      </div>
    </div></section>
  </>;

  const pages = { home: Home, about: About, services: Services, portfolio: Portfolio, partners: Partners, contact: Contact };
  const P = pages[pg] || Home;

  return (
    <div className={lang === "ko" ? "km" : ""}>
      <style>{S}</style>
      <Nav /><P /><Ft />
      {toast && <div className="tt">{toast}</div>}
    </div>
  );
}
