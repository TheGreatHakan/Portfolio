# 🚀 ANTIGRAVITY — Website Projesi Master Prompt

---

## Proje Tanımı

**Antigravity**, yerçekimsiz bir deneyim sunan, kullanıcıyı saran immersive bir web platformudur. Tema olarak "yerçekimine meydan okuyan" bir dijital deneyim yaratmayı hedefler — floating elementler, parallax katmanları, ağırlıksız geçişler ve kozmik bir atmosferle. Teknoloji stack'i olarak daha önce kullanmadığın Angular ekosistemini temel alır.

---

## 🛠 Teknoloji Stack'i

| Katman | Teknoloji | Açıklama |
|---|---|---|
| **Framework** | Angular LTS (v19+) | Standalone components, signals, OnPush |
| **UI Library** | ZardUI (@ngzard/ui) | shadcn/ui felsefesi, TailwindCSS v4, CVA variants |
| **Routing** | NgRouter | Lazy-loaded routes, route animations |
| **Reactive State** | RxJS | Observable streams, async pipe, state management |
| **Build Tool** | Vite (via @analogjs/vite-plugin-angular) | HMR, hızlı build, modern bundling |
| **Styling** | TailwindCSS v4 | ZardUI ile entegre, custom theme tokens |
| **Animations** | Angular Animations + CSS Keyframes | Route transitions, scroll-triggered reveals |
| **Icons** | Lucide Icons | ZardUI ile native entegrasyon |

---

## 🎨 Tema & Tasarım Dili

### Konsept: "Zero Gravity Digital Experience"

**Renk Paleti:**
```
--bg-void:        #0a0a0f        (Derin uzay siyahı)
--bg-nebula:      #12121f        (Koyu lacivert yüzeyler)
--surface:        #1a1a2e        (Kart/panel arka planı)
--accent-primary: #7c3aed        (Elektrik moru — ana vurgu)
--accent-glow:    #a78bfa        (Parlak lavanta — hover/glow)
--accent-cyan:    #06d6a0        (Neon yeşil-cyan — CTA ve interaktif)
--text-primary:   #e4e4ef        (Açık gri metin)
--text-muted:     #6b7280        (Soluk metin)
--gradient-nebula: linear-gradient(135deg, #7c3aed 0%, #06d6a0 100%)
```

**Tipografi:**
- **Display/Başlıklar:** "Outfit" veya "Syne" (bold, geometrik, futuristik)
- **Body:** "Satoshi" veya "General Sans" (modern, clean okunabilirlik)
- **Mono/Code:** "JetBrains Mono" (teknik bölümler için)

**Görsel Dil:**
- Floating card'lar (hafif gölge + subtle rotation transform)
- Glassmorphism panel'leri (backdrop-blur + border opacity)
- Kozmik parçacık arka planları (CSS veya canvas particles)
- Scroll-triggered parallax katmanları
- Neon glow efektleri (box-shadow + text-shadow)
- Staggered reveal animasyonları (elementler ağırlıksızca süzülerek gelir)
- Gradient mesh arka planlar
- Mouse-follow efektleri (imleci takip eden ışık kaynağı)

---

## 📄 Sayfa Yapısı & İçerik

### 1. 🏠 Ana Sayfa (Landing / Hero)
**Route:** `/`

- **Hero Section:**
  - Büyük tipografi: "DEFY GRAVITY" veya "BEYOND LIMITS" tarzı bold headline
  - Altında tek satırlık tagline: "Where code meets the cosmos"
  - Kozmik parçacık animasyonlu arka plan (yıldızlar, nebula efekti)
  - Mouse hareketi ile parallax tepki veren katmanlar
  - CTA butonu: "Explore the Void" → smooth scroll veya route geçişi
  - Floating geometric shapes (yavaşça dönen/hareket eden)

- **Hakkında Kısa Bölüm:**
  - "What is Antigravity?" — 2-3 satırlık açıklama
  - Glassmorphism kartlar içinde 3 anahtar özellik/değer
  - Scroll-triggered staggered fade-in animasyonları

- **Öne Çıkan Projeler / Showcase:**
  - 3-4 proje kartı (floating efektli, hover'da scale + glow)
  - Her kartta: başlık, kısa açıklama, teknoloji badge'leri, thumbnail
  - "View All" butonu → `/projects` sayfasına yönlendirme

- **İstatistik Bölümü:**
  - Animated counter'lar (scroll'da tetiklenen)
  - Örn: "X+ Projects", "Y+ Technologies", "Z+ Cups of Coffee"
  - Glassmorphism arka plan

- **Footer:**
  - Sosyal linkler (GitHub, LinkedIn, vb.)
  - "Built with Angular + ZardUI" badge
  - Gradient divider çizgisi

---

### 2. 🧑‍🚀 Hakkımda (About)
**Route:** `/about`

- **Profil Bölümü:**
  - Floating avatar (subtle animation)
  - İsim, unvan, kısa bio
  - Konum, üniversite bilgisi
  - İndirilebilir CV butonu

- **Yetenek Haritası (Skills):**
  - Kategorize edilmiş skill kartları (Frontend, Backend, Mobile, DevOps, AI)
  - Her kategori bir glassmorphism panel
  - Skill'ler ZardUI Badge component'leri ile gösterilir
  - Hover'da progress bar veya level göstergesi

- **Zaman Çizelgesi (Timeline):**
  - Eğitim ve deneyim akışı
  - Vertical timeline layout
  - Scroll-triggered reveal animasyonları
  - Her node'da tarih, başlık, açıklama

- **Hobiler & İlgi Alanları:**
  - Küçük ikon kartları (Tiyatro, Kodlama, Okuma, vb.)
  - Grid layout, hover efektleri

---

### 3. 🪐 Projeler (Projects)
**Route:** `/projects`

- **Filtreleme Sistemi:**
  - Teknolojiye göre filtre (ZardUI Toggle/Button group)
  - Kategoriye göre: Mobile, Web, AI, Backend
  - RxJS ile reactive filtering (debounced search + filter combineLatest)

- **Proje Grid'i:**
  - Masonry veya responsive grid layout
  - Her kart: thumbnail, başlık, açıklama, tech badges, GitHub + Live Demo linkleri
  - Hover efektleri: scale, border-glow, overlay bilgi
  - Route parametresi ile detay sayfasına geçiş

- **Proje Detay Sayfası:**
  - **Route:** `/projects/:slug`
  - Full-width hero görseli
  - Proje açıklaması, zorluklar, çözümler
  - Teknoloji stack'i detayları
  - Ekran görüntüleri galerisi
  - GitHub repo linki + Live demo

---

### 4. ✍️ Blog (Opsiyonel ama önerilir)
**Route:** `/blog`

- Yazı listesi (kart veya liste görünümü toggle)
- Kategoriler ve etiketler
- Arama fonksiyonu (RxJS debounce ile)
- Yazı detay sayfası: `/blog/:slug`
- Markdown render desteği (ngx-markdown)
- Okuma süresi tahmini
- Paylaşım butonları

---

### 5. 📬 İletişim (Contact)
**Route:** `/contact`

- **İletişim Formu:**
  - ZardUI Input, Textarea, Button component'leri
  - Reactive Forms (Angular) + RxJS validation
  - Form durumu: idle → sending → success/error
  - Floating label animasyonları

- **İletişim Bilgileri:**
  - E-posta, LinkedIn, GitHub
  - Konum bilgisi (harita embed opsiyonel)

- **"Let's Connect" CTA:**
  - Büyük tipografi + neon glow efekti

---

## ⚙️ Teknik Mimari

### Proje Yapısı
```
antigravity/
├── src/
│   ├── app/
│   │   ├── core/                    # Singleton services, guards, interceptors
│   │   │   ├── services/
│   │   │   │   ├── theme.service.ts        # Dark/light mode (RxJS BehaviorSubject)
│   │   │   │   ├── animation.service.ts    # Scroll-triggered animation yönetimi
│   │   │   │   └── project.service.ts      # Proje verisi yönetimi
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   │
│   │   ├── shared/                  # Paylaşılan componentler, directive'ler, pipe'lar
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   ├── footer/
│   │   │   │   ├── particle-bg/           # Kozmik parçacık arka planı
│   │   │   │   ├── floating-card/         # Reusable floating kart
│   │   │   │   ├── section-header/
│   │   │   │   ├── animated-counter/
│   │   │   │   └── glow-button/
│   │   │   ├── directives/
│   │   │   │   ├── parallax.directive.ts
│   │   │   │   ├── scroll-reveal.directive.ts
│   │   │   │   └── mouse-glow.directive.ts
│   │   │   └── pipes/
│   │   │
│   │   ├── features/                # Lazy-loaded feature modülleri
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── sections/
│   │   │   │   │   ├── hero/
│   │   │   │   │   ├── about-preview/
│   │   │   │   │   ├── featured-projects/
│   │   │   │   │   └── stats/
│   │   │   │   └── home.routes.ts
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── blog/
│   │   │   └── contact/
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── data/                    # JSON proje/blog verileri
│   │   └── fonts/
│   │
│   ├── styles/
│   │   ├── tailwind.css
│   │   ├── theme/
│   │   │   ├── _variables.css       # CSS custom properties
│   │   │   ├── _animations.css      # Keyframe tanımları
│   │   │   └── _glassmorphism.css   # Glass efekt utility'leri
│   │   └── global.css
│   │
│   └── environments/
│
├── angular.json
├── vite.config.ts                   # Vite konfigürasyonu
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Routing Konfigürasyonu
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component'),
    data: { animation: 'HomePage' }
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component'),
    data: { animation: 'AboutPage' }
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/project.routes'),
    data: { animation: 'ProjectsPage' }
  },
  {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog.routes'),
    data: { animation: 'BlogPage' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component'),
    data: { animation: 'ContactPage' }
  },
  { path: '**', redirectTo: '' }
];
```

### RxJS Kullanım Alanları
```typescript
// Örnek: Proje filtreleme servisi
@Injectable({ providedIn: 'root' })
export class ProjectFilterService {
  private searchTerm$ = new BehaviorSubject<string>('');
  private categoryFilter$ = new BehaviorSubject<string>('all');

  filteredProjects$ = combineLatest([
    this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged()),
    this.categoryFilter$,
    this.projectService.getAllProjects()
  ]).pipe(
    map(([search, category, projects]) =>
      projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === 'all' || p.category === category)
      )
    )
  );
}

// Örnek: Scroll-triggered animasyon
@Directive({ selector: '[appScrollReveal]' })
export class ScrollRevealDirective {
  private intersectionObserver$ = new Observable(observer => {
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => observer.next(e)), { threshold: 0.1 }
    );
    io.observe(this.el.nativeElement);
    return () => io.disconnect();
  });
}

// Örnek: Mouse-follow glow efekti
@Directive({ selector: '[appMouseGlow]' })
export class MouseGlowDirective {
  private mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    throttleTime(16), // ~60fps
    map(e => ({ x: e.clientX, y: e.clientY }))
  );
}
```

---

## 🎬 Animasyonlar & Micro-Interactions

### Route Geçiş Animasyonları
```
Sayfa girişi  → Fade in + slide up (opacity 0→1, translateY 20px→0)
Sayfa çıkışı  → Fade out + scale down (opacity 1→0, scale 1→0.98)
Süre: 400ms, easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Scroll-Triggered Reveals
```
Her section → Staggered children reveal
  - Her child element 80ms gecikme ile
  - Transform: translateY(30px) → translateY(0)
  - Opacity: 0 → 1
  - IntersectionObserver threshold: 0.1
```

### Hover Efektleri
```
Kartlar  → scale(1.02) + box-shadow glow (accent rengi ile)
Butonlar → Gradient shift + subtle scale(1.05)
Linkler  → Underline slide-in animasyonu
Badge'ler → Subtle pulse glow
```

### Özel Efektler
```
Hero parçacıklar → Canvas veya CSS ile yıldız/nebula
Mouse glow       → İmleci takip eden radial-gradient ışık
Floating shapes  → CSS animation ile sürekli yavaş hareket
Counter'lar      → requestAnimationFrame ile sayı animasyonu
```

---

## 📱 Responsive Tasarım

```
Mobile  (< 640px)  → Tek kolon, hamburger menü, küçültülmüş efektler
Tablet  (640-1024)  → İki kolon grid, sidebar collapse
Desktop (> 1024)    → Full deneyim, tüm animasyonlar aktif
```

- `prefers-reduced-motion` media query desteği (erişilebilirlik)
- Mobilde ağır animasyonları devre dışı bırak (performans)
- Touch-friendly etkileşimler

---

## 🔌 Ek Özellikler

- **Dark/Light Mode Toggle:** RxJS BehaviorSubject + CSS variables ile anında geçiş
- **i18n Hazırlığı:** Türkçe / İngilizce dil desteği altyapısı
- **SEO:** Angular SSR (optional) veya prerendering, meta tag yönetimi
- **Performance:** Lazy loading, image optimization, tree-shaking
- **Accessibility:** ARIA labels, keyboard navigation, focus management, renk kontrast oranları

---

## 📋 Geliştirme Sırası (Önerilen)

```
Faz 1 → Proje kurulumu (Angular + Vite + ZardUI + Tailwind)
Faz 2 → Core layout (Navbar, Footer, Route yapısı, animasyon altyapısı)
Faz 3 → Home page (Hero, sections, parçacık efektleri)
Faz 4 → About page (Profil, Skills, Timeline)
Faz 5 → Projects page (Filtreleme, Grid, Detay sayfası)
Faz 6 → Contact page (Form, validasyon)
Faz 7 → Blog page (opsiyonel)
Faz 8 → Polish (animasyon fine-tuning, responsive, a11y, SEO)
Faz 9 → Deploy (Vercel / Netlify / Cloudflare Pages)
```

---

## 💡 Prompt Kullanımı

Bu dokümanı Claude'a veya herhangi bir AI asistanına vererek şu şekilde başlayabilirsin:

> "Bu prompt'u oku ve Antigravity projesini adım adım oluşturmaya başlayalım. Faz 1 ile başla: Angular + Vite + ZardUI + TailwindCSS kurulumunu yap, proje yapısını oluştur ve temel konfigürasyonu hazırla."

Her faz tamamlandığında bir sonrakine geçerek iteratif olarak ilerlemeniz önerilir.

---

*Built with ☄️ by the Antigravity crew — defying gravity, one commit at a time.*