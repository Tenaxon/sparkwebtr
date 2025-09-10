import { useState, useEffect, useRef } from 'react';

// Hedef bölümlere yumuşak kaydırma yapan fonksiyon
const handleSmoothScroll = (event) => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href').substring(1);
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

// Header bileşeni artık tema değiştirme ve sayfa yönlendirme fonksiyonlarını alıyor
function Header({ onToggleTheme, currentTheme, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`w-full backdrop-blur sticky top-0 z-50 border-b ${currentTheme === 'light' ? 'bg-white/80' : 'bg-gray-800/80'}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#top" onClick={() => onNavigate('home')} className="flex items-center gap-2 cursor-pointer">
          {/* Buraya kendi logonuzu ekleyebilirsiniz. */}
          <img src="favicon.png" alt="SparkWeb Logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-xl">SparkWeb</span>
        </a>
        
        <nav className={`hidden md:flex gap-6 text-sm font-medium ${currentTheme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          <a href="#services" onClick={handleSmoothScroll} className="hover:text-black">Hizmetler</a>
          <a href="#portfolio-section" onClick={handleSmoothScroll} className="hover:text-black">Portfolyo</a>
          <a href="#pricing" onClick={handleSmoothScroll} className="hover:text-black">Fiyatlandırma</a>
          <a href="#faq" onClick={handleSmoothScroll} className="hover:text-black">SSS</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-black">İletişim</a>
        </nav>
        
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={onToggleTheme} className="rounded-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold">
            {currentTheme === 'light' ? 'Gece Modu' : 'Aydınlık Modu'}
          </button>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="inline-flex items-center rounded-full px-4 py-2 bg-brand text-white hover:bg-brand-dark text-sm font-semibold">İletişime Geçin</a>
        </div>

        {isMenuOpen && (
          <nav className={`md:hidden absolute top-16 left-0 w-full flex flex-col items-center gap-4 py-4 ${currentTheme === 'light' ? 'bg-white/90' : 'bg-gray-800/90'} backdrop-blur border-b`}>
            <a href="#services" onClick={handleSmoothScroll} className="hover:text-black">Hizmetler</a>
            <a href="#portfolio-section" onClick={handleSmoothScroll} className="hover:text-black">Portfolyo</a>
            <a href="#pricing" onClick={handleSmoothScroll} className="hover:text-black">Fiyatlandırma</a>
            <a href="#faq" onClick={handleSmoothScroll} className="hover:text-black">SSS</a>
            <div className="flex items-center gap-4">
              <button onClick={onToggleTheme} className="rounded-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold">
                {currentTheme === 'light' ? 'Gece Modu' : 'Aydınlık Modu'}
              </button>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="inline-flex items-center rounded-full px-4 py-2 bg-brand text-white hover:bg-brand-dark text-sm font-semibold">İletişime Geçin</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Hero bileşeni artık tema durumunu prop olarak alıyor
function Hero({ currentTheme, onNavigate }) {
  const isLight = currentTheme === 'light';
  return (
    <section className="relative overflow-hidden">
      <div className={`absolute inset-0 opacity-90 ${isLight ? 'bg-gradient-to-r from-brand to-brand-dark' : 'bg-gray-900 to-gray-700'}`} />
      <div className="relative max-w-6xl mx-auto px-4 py-24 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fade-in-down">İşletmeniz için Modern Web Siteleri</h1>
        <p className="mt-4 text-lg md:text-xl opacity-95 animate-fade-in-up">SparkWeb ile profesyonel, hızlı ve güvenilir web sitelerine sahip olun.</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#pricing" onClick={handleSmoothScroll} className={`rounded-full px-6 py-3 font-bold transition-all duration-300 hover:scale-105 w-full sm:w-auto ${isLight ? 'bg-white text-brand hover:bg-gray-100' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>Paketleri Gör</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className={`rounded-full px-6 py-3 border transition-all duration-300 hover:scale-105 w-full sm:w-auto ${isLight ? 'border-white/70 hover:bg-white/10' : 'border-gray-500/70 hover:bg-gray-600/10'}`}>İletişime Geçin</a>
        </div>
      </div>
    </section>
  );
}

function useInView(callback) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [callback]);
  return ref;
}

function Feature({title, desc}) {
  return (
    <div className="p-6 rounded-2xl border shadow-soft bg-white">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}

function Services() {
  const [inView, setInView] = useState(false);
  const sectionRef = useInView(setInView);

  return (
    <section id="services" className={`max-w-6xl mx-auto px-4 py-16 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={sectionRef}>
      <h2 className="text-3xl font-extrabold text-center">Hizmetler</h2>
      <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">Modern tasarım, hızlı kurulum ve bakım desteği ile işinizi dijitale taşıyoruz.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <Feature title="Modern Tasarım" desc="Markanıza uygun temiz ve çağdaş arayüzler." />
        <Feature title="Hızlı Teslim" desc="2-3 iş gününde yayında." />
        <Feature title="Teknik Destek" desc="Abonelikte aylık güncelleme ve bakım." />
      </div>
    </section>
  );
}

function PricingCard({name, price, period, features, highlight, onNavigate}) {
  return (
    <div className={`rounded-2xl border p-6 bg-white ${highlight ? 'border-brand shadow-soft' : 'shadow'}`}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-semibold">{name}</h3>
        {highlight && <span className="text-xs px-2 py-1 rounded-full bg-brand/10 text-brand font-semibold">Önerilen</span>}
      </div>
      <p className="mt-2 text-gray-600">{period}</p>
      <p className="mt-4 text-4xl font-extrabold">{price}</p>
      <ul className="mt-6 space-y-2 text-gray-700">
        {features.map((f, i) => (<li key={i}>✔️ {f}</li>))}
      </ul>
      <button onClick={() => onNavigate('contact')} className="mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2 bg-brand text-white hover:bg-brand-dark font-semibold transition-all duration-300 hover:scale-105">Seç</button>
    </div>
  );
}

function Pricing({ onNavigate }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useInView(setInView);
  return (
    <section id="pricing" className={`max-w-6xl mx-auto px-4 py-16 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={sectionRef}>
      <h2 className="text-3xl font-extrabold text-center">Fiyatlandırma</h2>
      <p className="text-gray-600 text-center mt-2 max-w-2xl mx-auto">İhtiyacınıza uygun planı seçin, işiniz büyüdükçe kolayca yükseltin.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <PricingCard
          name="Başlangıç"
          price="₺1000"
          period="Tek seferlik"
          features={[
            'Tek sayfa site',
            'Mobil uyum',
            'Temel SEO',
            '3 günde teslim'
          ]}
          onNavigate={onNavigate}
        />
        <PricingCard
          name="Profesyonel"
          price="₺2.300"
          period="Tek seferlik"
          highlight
          features={[
            '3 sayfa site',
            'Gelişmiş SEO',
            'Harita & sosyal medya',
            '2 revize'
          ]}
          onNavigate={onNavigate}
        />
        <PricingCard
          name="Abonelik"
          price="₺300/ay"
          period="Aylık bakım & güncelleme"
          features={[
            'İçerik güncellemeleri',
            'Teknik destek',
            'SEO güncellemeleri',
            '2 ayda 1 ekstra sayfa'
          ]}
          onNavigate={onNavigate}
        />
      </div>
    </section>
  );
}

function FAQ({ currentTheme }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useInView(setInView);
  const items = [
    { q: 'Web sitesi teslim süresi ne kadar?', a: 'Genellikle 2-3 iş günü içinde teslim ediyoruz.' },
    { q: 'Tasarım hazır mı özel mi?', a: 'Sektörüne uygun özel olarak hazırlanır.' },
    { q: 'Hosting ve domain kime ait?', a: 'Domain ve hosting size aittir; kurulumda yardımcı oluruz.' },
    { q: 'Siteyi sonradan güncelleyebilir miyim?', a: 'Abonelikle biz güncelleriz; basit değişikliklere rehber veririz.' },
    { q: 'Ödeme güvenli mi?', a: 'Güvenli ödeme yöntemleri kullanılır ve her işlem kayıt altındadır.' },
  ];
  const isLight = currentTheme === 'light';
  return (
    <section id="faq" className={`max-w-3xl mx-auto px-4 py-16 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={sectionRef}>
      <h2 className="text-3xl font-extrabold text-center">Sık Sorulan Sorular</h2>
      <div className={`mt-8 divide-y rounded-2xl border ${isLight ? 'bg-white' : 'bg-gray-800'}`}>
        {items.map((it, i) => (
          <details key={i} className={`p-4 group ${isLight ? 'bg-white open:bg-gray-50' : 'bg-gray-800 open:bg-gray-700'}`}>
            <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
              <span>{it.q}</span>
              <span className={`text-gray-400 group-open:rotate-180 transition ${!isLight ? 'text-gray-300' : ''}`}>⌄</span>
            </summary>
            <p className={`mt-2 text-gray-600 ${!isLight ? 'text-gray-400' : ''}`}>{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Anasayfaya yeni eklenen İletişim bölümü
function ContactSection({ currentTheme, onNavigate }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useInView(setInView);
  const isLight = currentTheme === 'light';

  return (
    <section
      id="contact-section"
      className={`max-w-6xl mx-auto px-4 py-16 text-center transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      ref={sectionRef}
    >
      <h2 className={`text-3xl font-extrabold ${isLight ? 'text-gray-900' : 'text-white'}`}>
        Hazır mısınız?
      </h2>
      <p className={`mt-2 max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
        Profesyonel web siteniz için hemen iletişime geçin.
      </p>
      <div className="mt-8">
        <button
          onClick={() => onNavigate('contact')}
          className={`inline-flex items-center rounded-full px-6 py-3 font-bold transition-all duration-300 hover:scale-105 ${isLight ? 'bg-brand text-white hover:bg-brand-dark' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
        >
          İletişime Geçin
        </button>
      </div>
    </section>
  );
}

// Yeni İletişim Sayfası Bileşeni - Formspree ile yeniden yazıldı ve geri dön butonu eklendi.
function ContactPage({ currentTheme, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Ad soyad alanı boş bırakılamaz.';
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi boş bırakılamaz.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefon numarası boş bırakılamaz.';
    if (!formData.message.trim()) newErrors.message = 'Mesaj alanı boş bırakılamaz.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
    } else {
      try {
        const response = await fetch("https://formspree.io/f/xyzdojbz", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          setSubmitError("Form gönderimi başarısız oldu. Lütfen tekrar deneyin.");
        }
      } catch (error) {
        setSubmitError("Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const isLight = currentTheme === 'light';

  return (
    <section id="contact" className={`max-w-2xl mx-auto px-4 py-16 min-h-screen ${isLight ? 'bg-white' : 'bg-gray-900'}`}>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-brand hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ana Sayfaya Dön
        </button>
      </div>
      <h2 className={`text-3xl font-extrabold text-center ${isLight ? 'text-gray-900' : 'text-white'}`}>Bize Ulaşın</h2>
      <p className={`text-center mt-2 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Lütfen formu doldurun, size en kısa sürede dönüş yapacağız.</p>
      
      {isSubmitted ? (
        <div className="mt-8 p-6 bg-green-100 text-green-700 border border-green-200 rounded-md text-center">
          <p className="font-semibold">Talebiniz başarıyla gönderildi!</p>
          <p className="mt-2 text-sm">En kısa sürede size geri döneceğiz.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="_subject" value="SparkWeb İletişim Formu" />
          
          {submitError && (
            <div className="p-4 rounded-md bg-red-100 text-red-700 border border-red-200">
              {submitError}
            </div>
          )}

          <div>
            <label htmlFor="name" className={`block text-sm font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>Ad Soyad</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız ve Soyadınız"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-brand ${isLight ? 'border-gray-300 focus:border-brand text-gray-900' : 'bg-gray-700 text-white border-gray-600 focus:border-brand placeholder-gray-400'} ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>E-posta Adresi</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@email.com"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-brand ${isLight ? 'border-gray-300 focus:border-brand text-gray-900' : 'bg-gray-700 text-white border-gray-600 focus:border-brand placeholder-gray-400'} ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={`block text-sm font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>Telefon Numarası</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="5XX XXX XX XX"
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-brand ${isLight ? 'border-gray-300 focus:border-brand text-gray-900' : 'bg-gray-700 text-white border-gray-600 focus:border-brand placeholder-gray-400'} ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="message" className={`block text-sm font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>Mesajınız</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Projenizi anlatan kısa bir mesaj yazın..."
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-brand ${isLight ? 'border-gray-300 focus:border-brand text-gray-900' : 'bg-gray-700 text-white border-gray-600 focus:border-brand placeholder-gray-400'} ${errors.message ? 'border-red-500' : ''}`}
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>
          <div>
            <button type="submit" disabled={submitting} className="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-brand text-base font-medium text-white shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2">Gönder</button>
          </div>
        </form>
      )}
    </section>
  );
}


// Ana sayfa için Portfolyo bölümü
function PortfolioSection({ currentTheme }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useInView(setInView);
  const isLight = currentTheme === 'light';

  // Demo portfolyo verileri
  const projects = [
    {
      title: "E-ticaret Sitesi",
      description: "Hızlı ve güvenilir bir e-ticaret platformu.",
      image: "eticaret.png",
      link: "#"
    },
    {
      title: "Kurumsal Web Sitesi",
      description: "Şirketiniz için modern ve profesyonel bir vitrin.",
      image: "kurumsal.png",
      link: "#"
    },
    {
      title: "Blog & Portfolyo",
      description: "İçeriklerinizi ve çalışmalarınızı sergileyin.",
      image: "portfolyo.png",
      link: "#"
    },
    {
      title: "Rezervasyon Sistemi",
      description: "Online randevu ve rezervasyon çözümleri.",
      image: "rezervasyon.png",
      link: "#"
    },
    {
      title: "Yazılım Projesi Sayfası",
      description: "Uygulamanızı tanıtın ve kullanıcıları ikna edin.",
      image: "yazilim.png",
      link: "#"
    },
    {
      title: "Emlak Web Sitesi",
      description: "Gayrimenkul listelemeleri için modern tasarım.",
      image: "emlak.png",
      link: "#"
    },
  ];

  return (
    <section id="portfolio-section" className={`max-w-6xl mx-auto px-4 py-16 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={sectionRef}>
      <h2 className={`text-3xl font-extrabold text-center ${isLight ? 'text-gray-900' : 'text-white'}`}>Portfolyo</h2>
      <p className={`text-center mt-2 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Yaptığımız bazı çalışmaları inceleyebilirsiniz.</p>
      
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className={`rounded-2xl overflow-hidden shadow-soft transition-transform duration-300 hover:scale-105 ${isLight ? 'bg-white border' : 'bg-gray-800'}`}>
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{project.description}</p>
              <a href={project.link} className="mt-4 inline-block text-brand font-semibold hover:underline">
                İncele
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Ayrı bir Gizlilik Politikası sayfası bileşeni oluşturuldu
function PrivacyPolicy({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-brand hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ana Sayfaya Dön
        </button>
      </div>
      <h2 className="text-3xl font-extrabold text-center">Gizlilik Politikası</h2>
      <div className="mt-8 text-gray-700 space-y-4 text-justify">
        <p>SparkWeb ("biz", "bize" veya "bizim") olarak, müşterilerimizin ve potansiyel müşterilerimizin gizliliğini korumaya büyük önem veriyoruz. Bu politika, web sitesi tasarım ve geliştirme hizmetimiz kapsamında topladığımız bilgileri, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.</p>
        <p>Hizmetlerimizi talep ettiğinizde, adınız, e-posta adresiniz, işletme adınız ve projenizle ilgili detaylar gibi kişisel bilgileri toplarız. Bu bilgiler, size özel web sitesi projenizi yönetmek, sizinle iletişim kurmak, teklif hazırlamak ve hizmet kalitemizi artırmak için kullanılır.</p>
        <p>Topladığımız kişisel ve ticari bilgilerinizi, projenizin tamamlanması için zorunlu olmadıkça (örneğin, alan adı tescili için ilgili kuruma bilgi vermek) üçüncü taraflarla paylaşmayız. Bu bilgileri izniniz olmadan pazarlama amacıyla kullanmayız.</p>
        <p>Bilgilerinizin güvenliğini sağlamak için gerekli teknik ve idari önlemleri alıyoruz. Ancak, internet üzerinden veri iletiminin %100 güvenli olmadığını belirtmek isteriz.</p>
        <p>Bu Gizlilik Politikası, hizmetlerimizin değişmesiyle birlikte güncellenebilir. Herhangi bir değişiklik durumunda, güncellenmiş politikayı bu sayfada yayınlayacağız. Bu politikayı periyodik olarak gözden geçirmeniz tavsiye edilir.</p>
      </div>
    </div>
  );
}

// Ayrı bir Hizmet Şartları sayfası bileşeni oluşturuldu
function TermsOfService({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-brand hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ana Sayfaya Dön
        </button>
      </div>
      <h2 className="text-3xl font-extrabold text-center">Hizmet Şartları</h2>
      <div className="mt-8 text-gray-700 space-y-4 text-justify">
        <p>SparkWeb olarak, size özel web sitesi tasarım ve geliştirme hizmetleri sunuyoruz. Bu hizmetleri kullanmaya başlayarak, aşağıdaki hizmet şartlarını kabul etmiş sayılırsınız.</p>
        <p>SparkWeb, sizin belirlediğiniz ihtiyaçlar doğrultusunda web sitenizin tasarım ve geliştirme sürecini üstlenir. Hizmetin kapsamı, anlaşılan paket veya teklifte belirtilen özelliklerle sınırlıdır. Ek istekler, ek ücretlendirmeye tabi olabilir.</p>
        <p>Web sitesinin tam mülkiyeti (tasarım, kod, içerik vb.) ödemenin tamamlanmasının ardından size ait olacaktır. SparkWeb, projenizi portfolyosunda referans olarak kullanma hakkını saklı tutar.</p>
        <p>Müşteri olarak, web sitesinde kullanılacak tüm içerik, metin ve görselleri sağlamaktan siz sorumlusunuz. Bu içeriklerin telif hakkı sorunları yaratmadığından emin olmalısınız.</p>
        <p>Hizmet bedeli, proje başlamadan önce ve tamamlandıktan sonra olmak üzere iki taksitte tahsil edilir. İade politikası, sözleşmede belirtilen koşullara tabidir.</p>
        <p>Proje teslim edildikten sonra, belirlenen süre içinde oluşabilecek teknik hatalara karşı destek sağlanır. İçerik ve tasarım değişiklikleri, aylık bakım aboneliği kapsamında değerlendirilir.</p>
        <p>SparkWeb, bu şartları önceden bildirim yapmaksızın güncelleme hakkını saklı tutar. Değişiklikler, yayınlandıkları andan itibaren geçerlidir.</p>
      </div>
    </div>
  );
}

// Footer bileşeni, sayfa yönlendirme fonksiyonunu ve sosyal medya logolarını alıyor
function Footer({ onNavigate, currentTheme }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useInView(setInView);
  const isLight = currentTheme === 'light';

  return (
    <footer className={`py-10 transition-all duration-1000 transform ${isLight ? 'bg-gray-100 text-gray-700' : 'bg-gray-900 text-gray-300'} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} SparkWeb</p>
        <div className="flex gap-6">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }} className={`hover:underline ${isLight ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Gizlilik Politikası</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('terms'); }} className={`hover:underline ${isLight ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>Hizmet Şartları</a>
        </div>
        
        {/* Sosyal Medya Butonları - Gece modunda görünmesi için düzeltildi */}
        <div className="flex gap-4 items-center">
          {/* Instagram Logosu */}
          <a href="https://www.instagram.com/sparkwebtr" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${isLight ? 'text-gray-700 hover:text-brand-dark hover:bg-gray-200' : 'text-gray-300 hover:text-brand-light hover:bg-gray-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 1 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          {/* Facebook Logosu */}
          <a href="https://www.facebook.com/profile.php?id=61578844991754" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${isLight ? 'text-gray-700 hover:text-brand-dark hover:bg-gray-200' : 'text-gray-300 hover:text-brand-light hover:bg-gray-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.049c-5.405 0-9.805 4.399-9.805 9.8c0 4.981 3.657 9.128 8.4 9.943v-7.005H7.79v-2.938h2.812V8.423c0-2.784 1.703-4.302 4.17-4.302 1.18 0 2.228.212 2.536.307v2.923h-1.543c-1.346 0-1.61.64-1.61 1.57v1.986h3.24l-.422 2.938h-2.818V21.75c5.385-.945 9.422-5.748 9.422-11.895-.001-5.401-4.4-9.8-9.8-9.8z"/>
            </svg>
          </a>
          {/* X (Twitter) Logosu */}
          <a href="https://www.twitter.com/sparkwebtr" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${isLight ? 'text-gray-700 hover:text-brand-dark hover:bg-gray-200' : 'text-gray-300 hover:text-brand-light hover:bg-gray-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.144h3.284L14.072 10.43 23.324 23h-7.653l-5.83-7.585L4.47 23H1.18L10.395 12.871L1.472 1.144h7.937l5.247 6.817L18.901 1.144ZM17.65 21.01L7.747 3.01H6.18L16.082 21.01h1.568Z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

// Ana Uygulama Bileşeni
export default function App() {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('home');
  const [pageTransitioning, setPageTransitioning] = useState(false);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const navigateToPage = (pageName) => {
    if (pageName === currentPage) return;
    setPageTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageName);
      setPageTransitioning(false);
    }, 500); // Animasyon süresi (0.5 saniye)
  };

  return (
    <div id="top" className={`app ${theme}-theme ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
      <style>
        {`
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down { animation: fadeInDown 1s ease-out; }
          .animate-fade-in-up { animation: fadeInUp 1s ease-out; }

          @keyframes fadeInSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .transition-fade-in {
            animation: fadeInSlideUp 0.5s ease-out;
          }
        `}
      </style>
      <Header onToggleTheme={toggleTheme} currentTheme={theme} onNavigate={navigateToPage} />
      
      {currentPage === 'home' && (
        <div className={pageTransitioning ? 'transition-fade-in' : ''}>
          <Hero currentTheme={theme} onNavigate={navigateToPage} />
          <Services />
          <PortfolioSection currentTheme={theme} />
          <Pricing onNavigate={navigateToPage} />
          <FAQ currentTheme={theme} />
          {/* Yeni eklenen İletişim bölümü */}
          <ContactSection currentTheme={theme} onNavigate={navigateToPage} />
        </div>
      )}

      {currentPage === 'contact' && (
        <div className={pageTransitioning ? 'transition-fade-in' : ''}>
          <ContactPage currentTheme={theme} onNavigate={navigateToPage} />
        </div>
      )}
      {currentPage === 'privacy' && (
        <div className={pageTransitioning ? 'transition-fade-in' : ''}>
          <PrivacyPolicy onNavigate={navigateToPage} />
        </div>
      )}
      {currentPage === 'terms' && (
        <div className={pageTransitioning ? 'transition-fade-in' : ''}>
          <TermsOfService onNavigate={navigateToPage} />
        </div>
      )}

      <Footer onNavigate={navigateToPage} currentTheme={theme} />
    </div>
  );
}
