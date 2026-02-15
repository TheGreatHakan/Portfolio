import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    date: string;
    readTime: number;
    image: string;
    featured?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
    private postsSubject = new BehaviorSubject<BlogPost[]>(this.getPosts());
    posts$ = this.postsSubject.asObservable();

    getPostBySlug(slug: string): BlogPost | undefined {
        return this.postsSubject.value.find(p => p.slug === slug);
    }

    getFeaturedPosts(): BlogPost[] {
        return this.postsSubject.value.filter(p => p.featured);
    }

    getPostsByCategory(category: string): BlogPost[] {
        if (category === 'All') return this.postsSubject.value;
        return this.postsSubject.value.filter(p => p.category === category);
    }

    getCategories(): string[] {
        const cats = new Set(this.postsSubject.value.map(p => p.category));
        return ['All', ...Array.from(cats)];
    }

    getRelatedPosts(slug: string, limit = 3): BlogPost[] {
        const current = this.getPostBySlug(slug);
        if (!current) return [];
        return this.postsSubject.value
            .filter(p => p.slug !== slug && (p.category === current.category || p.tags.some(t => current.tags.includes(t))))
            .slice(0, limit);
    }

    private getPosts(): BlogPost[] {
        return [
            {
                slug: 'angular-19-standalone-components',
                title: 'Angular 19 Standalone Components: The Future of Modular Architecture',
                excerpt: 'Discover how standalone components in Angular 19 simplify your application architecture and eliminate the need for NgModules.',
                content: `
## The Evolution of Angular Components

Angular 19 takes standalone components to the next level. With the new \`@Component\` decorator defaults, every component is now standalone by default — no more \`standalone: true\` boilerplate.

### Why Standalone?

The traditional NgModule approach required developers to:
- Create a module for every feature
- Manage complex import/export trees
- Deal with circular dependency issues

Standalone components solve all of this by making each component self-contained.

### Key Benefits

1. **Simpler Mental Model** — Each component declares its own dependencies
2. **Better Tree-Shaking** — Only used components are bundled
3. **Faster Compilation** — No module resolution overhead
4. **Easier Testing** — Components are isolated by default

### Code Example

\`\`\`typescript
@Component({
  selector: 'app-hero',
  imports: [RouterLink, CommonModule],
  template: \\\`<h1>Hello Angular 19!</h1>\\\`
})
export class HeroComponent {}
\`\`\`

### Migration Strategy

If you're migrating from NgModules, Angular provides a schematic:

\`\`\`bash
ng generate @angular/core:standalone
\`\`\`

This will automatically convert your modules to standalone components while preserving functionality.

### Performance Impact

Our benchmarks show:
- **15% faster** initial load times
- **20% smaller** bundle sizes
- **30% faster** Hot Module Replacement

The future is standalone. Start migrating today!
                `.trim(),
                category: 'Angular',
                tags: ['Angular', 'Architecture', 'TypeScript'],
                date: '2026-02-08',
                readTime: 6,
                image: '⚡',
                featured: true,
            },
            {
                slug: 'building-cosmic-ui-with-tailwind',
                title: 'Building a Cosmic UI with TailwindCSS v4 and Glassmorphism',
                excerpt: 'Learn how to create stunning glassmorphism effects and cosmic-themed interfaces using TailwindCSS v4 custom properties.',
                content: `
## Designing for the Cosmos

Creating a cosmic-themed UI isn't just about dark backgrounds and purple gradients. It's about evoking a sense of wonder and depth.

### The Glassmorphism Effect

Glassmorphism creates a frosted-glass look using:

\`\`\`css
.glass {
  background: oklch(0.15 0.02 280 / 60%);
  backdrop-filter: blur(20px);
  border: 1px solid oklch(1 0 0 / 8%);
}
\`\`\`

### Color Palette with OKLCH

TailwindCSS v4 supports OKLCH natively, giving us perceptually uniform colors:

- **Nebula Purple**: \`oklch(0.55 0.25 290)\`
- **Cosmic Cyan**: \`oklch(0.70 0.18 165)\`
- **Star White**: \`oklch(0.95 0 0)\`

### Glow Effects

Adding subtle glows elevates the entire design:

\`\`\`css
.glow-button {
  box-shadow: 0 0 30px oklch(0.55 0.25 290 / 20%);
  transition: box-shadow 0.3s ease;
}
.glow-button:hover {
  box-shadow: 0 0 50px oklch(0.55 0.25 290 / 40%);
}
\`\`\`

### Particle Background

Canvas-based particles add life to your backgrounds without heavy frameworks:

1. Create a canvas element
2. Generate random star positions
3. Animate with \`requestAnimationFrame\`
4. Add twinkling via opacity oscillation

The key is subtlety — particles should enhance, not distract.
                `.trim(),
                category: 'Design',
                tags: ['TailwindCSS', 'CSS', 'Design', 'UI/UX'],
                date: '2026-02-05',
                readTime: 8,
                image: '🎨',
                featured: true,
            },
            {
                slug: 'rxjs-patterns-angular',
                title: 'Essential RxJS Patterns Every Angular Developer Should Know',
                excerpt: 'Master the reactive patterns that power modern Angular applications — from debounced search to scroll-driven animations.',
                content: `
## Thinking Reactively

RxJS is the backbone of Angular's reactive architecture. Here are the patterns you'll use daily.

### 1. Debounced Search

\`\`\`typescript
searchTerm$ = new BehaviorSubject('');

results$ = this.searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term))
);
\`\`\`

### 2. Scroll-Triggered Animations

Running scroll listeners outside Angular's zone prevents unnecessary change detection:

\`\`\`typescript
scrollState$ = this.ngZone.runOutsideAngular(() =>
  fromEvent(window, 'scroll').pipe(
    throttleTime(16),
    map(() => window.scrollY)
  )
);
\`\`\`

### 3. Combining Multiple Streams

\`\`\`typescript
filteredData$ = combineLatest([
  this.searchTerm$,
  this.categoryFilter$,
  this.data$,
]).pipe(
  map(([term, category, data]) =>
    data.filter(item =>
      item.name.includes(term) &&
      (category === 'all' || item.category === category)
    )
  )
);
\`\`\`

### 4. Managing Subscriptions

Always clean up! Use \`takeUntilDestroyed\` in Angular 19:

\`\`\`typescript
export class MyComponent {
  constructor() {
    this.data$.pipe(
      takeUntilDestroyed()
    ).subscribe(data => this.process(data));
  }
}
\`\`\`

### Best Practices

- Prefer \`async\` pipe over manual subscriptions
- Use \`shareReplay\` for expensive computations
- Keep operators simple — compose, don't nest
                `.trim(),
                category: 'Angular',
                tags: ['RxJS', 'Angular', 'Reactive Programming'],
                date: '2026-01-28',
                readTime: 10,
                image: '🔄',
                featured: true,
            },
            {
                slug: 'flutter-vs-react-native-2026',
                title: 'Flutter vs React Native in 2026: Which Should You Choose?',
                excerpt: 'An honest comparison of the two leading cross-platform frameworks with real-world performance data and developer experience insights.',
                content: `
## The State of Cross-Platform in 2026

Both frameworks have evolved significantly. Here's where they stand.

### Performance

Flutter compiles to native ARM code, giving it an edge in:
- Animation smoothness (consistent 60/120fps)
- Complex UI rendering
- Startup time

React Native with the New Architecture (Fabric + TurboModules) has closed the gap for most use cases.

### Developer Experience

**Flutter** advantages:
- Hot reload is incredibly fast
- Dart is easy to learn
- Widget system is powerful and flexible
- Official DevTools are excellent

**React Native** advantages:
- JavaScript ecosystem (npm)
- Easier web developer transition
- OTA updates possible
- Expo simplifies setup

### When to Choose Flutter
- Heavy custom UI / animations
- Single team managing mobile
- Performance-critical apps
- New project without JS legacy

### When to Choose React Native
- Existing React/JS team
- Code sharing with web app
- Need OTA updates
- Simpler UI requirements

### The Verdict

There's no wrong choice. Both are production-ready. Choose based on your team's expertise and project requirements.
                `.trim(),
                category: 'Mobile',
                tags: ['Flutter', 'React Native', 'Mobile Development'],
                date: '2026-01-20',
                readTime: 7,
                image: '📱',
                featured: false,
            },
            {
                slug: 'vite-angular-setup',
                title: 'Supercharging Angular with Vite: A Complete Setup Guide',
                excerpt: 'Step-by-step guide to setting up Angular 19 with Vite for lightning-fast builds and HMR.',
                content: `
## Why Vite + Angular?

Webpack served us well, but Vite's native ESM dev server is a game-changer:

- **10x faster** cold starts
- **Instant** Hot Module Replacement  
- **Native** TypeScript support

### Setup

\`\`\`bash
npm create vite@latest my-app -- --template angular
\`\`\`

Or add to existing project:

\`\`\`bash
npm install @analogjs/vite-plugin-angular --save-dev
\`\`\`

### Configuration

\`\`\`typescript
// vite.config.ts
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: { port: 4200 }
});
\`\`\`

### Key Differences from Webpack

| Feature | Webpack | Vite |
|---------|---------|------|
| Dev server | Bundle-based | Native ESM |
| HMR | Seconds | Milliseconds |
| Build | Slow | Fast (Rollup) |
| Config | Complex | Minimal |

### Tips

1. Use \`vitest\` for unit tests
2. Enable source maps in dev mode only
3. Leverage Vite's CSS modules support
4. Use dynamic imports for code splitting

The future of Angular tooling is Vite. Don't look back.
                `.trim(),
                category: 'DevOps',
                tags: ['Vite', 'Angular', 'Build Tools'],
                date: '2026-01-15',
                readTime: 5,
                image: '⚡',
                featured: false,
            },
            {
                slug: 'canvas-particle-effects',
                title: 'Creating Stunning Canvas Particle Effects for Web',
                excerpt: 'Build a performant starfield particle system from scratch using the Canvas API and requestAnimationFrame.',
                content: `
## The Art of Particles

Particle effects add life to any website. Here's how to build them performantly.

### Basic Setup

\`\`\`typescript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d')!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
\`\`\`

### Particle Class

\`\`\`typescript
interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
}
\`\`\`

### Animation Loop

\`\`\`typescript
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.opacity = 0.3 + Math.sin(Date.now() * p.twinkleSpeed) * 0.4;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = \\\`rgba(255, 255, 255, \\\${p.opacity})\\\`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
\`\`\`

### Performance Tips

- Cap particle count (150-200 max)
- Use \`requestAnimationFrame\`, never \`setInterval\`
- Avoid creating objects in the render loop
- Consider OffscreenCanvas for really heavy effects
- Clean up on component destroy

The result: a beautiful, twinkling starfield that uses minimal CPU.
                `.trim(),
                category: 'Design',
                tags: ['Canvas', 'Animation', 'Performance', 'JavaScript'],
                date: '2026-01-10',
                readTime: 9,
                image: '✨',
                featured: false,
            },
        ];
    }
}
