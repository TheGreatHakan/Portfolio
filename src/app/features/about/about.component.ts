import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FloatingCardComponent } from '../../shared/components/floating-card/floating-card.component';
import { GlowButtonComponent } from '../../shared/components/glow-button/glow-button.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective, SectionHeaderComponent, FloatingCardComponent, GlowButtonComponent],
  template: `
    <div class="min-h-screen pt-32 pb-24 px-6">
      <div class="max-w-4xl mx-auto">

        <!-- ═══════════ PROFILE ═══════════ -->
        <app-section-header
          badge="Who Am I"
          preTitle="About"
          highlightTitle="Me" />

        <div appScrollReveal class="mb-20">
          <app-floating-card [glowOnHover]="false">
            <div class="p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
              <!-- Floating Avatar -->
              <div class="relative flex-shrink-0">
                <div class="w-28 h-28 rounded-full glass-strong flex items-center justify-center
                            ring-2 ring-[oklch(0.55_0.25_290/30%)] animate-float">
                  <span class="text-5xl">🧑‍🚀</span>
                </div>
                <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-nebula
                            flex items-center justify-center text-xs">✦</div>
              </div>
              <!-- Bio -->
              <div>
                <h2 class="font-display font-bold text-2xl mb-1">
                  Hello, I'm <span class="gradient-nebula-text">Hakan</span>
                </h2>
                <p class="text-sm text-muted-foreground/60 mb-3">
                  Full-Stack Developer · Turkey 🇹🇷
                </p>
                <p class="text-muted-foreground leading-relaxed mb-3">
                  A passionate developer navigating the digital cosmos. I specialize in
                  creating immersive, high-performance applications using modern frameworks
                  like Angular, Flutter, and React.
                </p>
                <p class="text-muted-foreground leading-relaxed mb-5">
                  When I'm not coding, you'll find me exploring new technologies,
                  contributing to open source, or gazing at the stars ✨
                </p>
                <app-glow-button variant="secondary">Download CV 📄</app-glow-button>
              </div>
            </div>
          </app-floating-card>
        </div>

        <!-- ═══════════ SKILLS ═══════════ -->
        <app-section-header
          badge="Tech Stack"
          preTitle="Skill"
          highlightTitle="Universe" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          @for (category of skillCategories; track category.name; let i = $index) {
            <div appScrollReveal [revealDelay]="i * 100">
              <app-floating-card>
                <div class="p-5">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl glass flex items-center justify-center text-xl">
                      {{ category.icon }}
                    </div>
                    <h3 class="font-display font-bold text-base">{{ category.name }}</h3>
                  </div>
                  <div class="space-y-2">
                    @for (skill of category.skills; track skill.name) {
                      <div class="group cursor-default">
                        <div class="flex justify-between items-center mb-1">
                          <span class="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                            {{ skill.name }}
                          </span>
                          <span class="text-[10px] text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            {{ skill.level }}%
                          </span>
                        </div>
                        <div class="h-1 rounded-full bg-[oklch(1_0_0/5%)] overflow-hidden">
                          <div class="h-full rounded-full gradient-nebula transition-all duration-700 group-hover:opacity-100 opacity-70"
                               [style.width.%]="skill.level"></div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </app-floating-card>
            </div>
          }
        </div>

        <!-- ═══════════ TIMELINE ═══════════ -->
        <app-section-header
          badge="Journey"
          preTitle="Experience"
          highlightTitle="Timeline" />

        <div class="relative mb-20">
          <!-- Timeline line -->
          <div class="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b
                      from-[oklch(0.55_0.25_290)] via-[oklch(0.70_0.18_165)] to-transparent"></div>

          @for (item of timeline; track item.year; let i = $index) {
            <div appScrollReveal [revealDelay]="i * 120" class="relative pl-12 pb-10 last:pb-0">
              <!-- Dot -->
              <div class="absolute left-[9px] top-1.5 w-3 h-3 rounded-full gradient-nebula
                          ring-4 ring-background"></div>
              <!-- Content -->
              <div class="glass rounded-xl p-5 hover:border-[oklch(0.55_0.25_290/15%)]
                          border border-transparent transition-colors duration-300">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                  <span class="text-xs px-2.5 py-1 rounded-full gradient-nebula text-white font-bold">
                    {{ item.year }}
                  </span>
                  <h4 class="font-display font-bold text-sm">{{ item.title }}</h4>
                </div>
                <p class="text-sm text-muted-foreground leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          }
        </div>

        <!-- ═══════════ HOBBIES ═══════════ -->
        <app-section-header
          badge="Beyond Code"
          preTitle="Hobbies &"
          highlightTitle="Interests" />

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          @for (hobby of hobbies; track hobby.name; let i = $index) {
            <div appScrollReveal [revealDelay]="i * 80">
              <div class="glass rounded-xl p-4 text-center hover:scale-105
                          hover:border-[oklch(0.55_0.25_290/15%)] border border-transparent
                          transition-all duration-300 cursor-default group">
                <div class="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {{ hobby.icon }}
                </div>
                <p class="text-xs font-medium text-muted-foreground group-hover:text-foreground
                          transition-colors">
                  {{ hobby.name }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {
  skillCategories = [
    {
      name: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'Angular', level: 90 },
        { name: 'React', level: 80 },
        { name: 'TypeScript', level: 92 },
        { name: 'TailwindCSS', level: 88 },
        { name: 'RxJS', level: 75 },
      ],
    },
    {
      name: 'Mobile',
      icon: '📱',
      skills: [
        { name: 'Flutter', level: 85 },
        { name: 'Dart', level: 82 },
        { name: 'iOS/Android', level: 65 },
        { name: 'React Native', level: 55 },
      ],
    },
    {
      name: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'NestJS', level: 72 },
        { name: 'Python', level: 65 },
        { name: 'REST/GraphQL', level: 78 },
      ],
    },
    {
      name: 'Database',
      icon: '🗄️',
      skills: [
        { name: 'PostgreSQL', level: 75 },
        { name: 'Firebase', level: 82 },
        { name: 'MongoDB', level: 68 },
        { name: 'Supabase', level: 60 },
      ],
    },
    {
      name: 'DevOps',
      icon: '🚀',
      skills: [
        { name: 'Docker', level: 70 },
        { name: 'CI/CD', level: 72 },
        { name: 'Vercel/AWS', level: 65 },
        { name: 'Nginx', level: 55 },
      ],
    },
    {
      name: 'Tools',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Vite/Webpack', level: 78 },
        { name: 'Figma', level: 60 },
        { name: 'VS Code', level: 95 },
      ],
    },
  ];

  timeline = [
    {
      year: '2024',
      title: 'Senior Full-Stack Developer',
      description: 'Leading development of enterprise Angular applications, Flutter mobile apps, and AI-powered platforms.',
    },
    {
      year: '2023',
      title: 'Full-Stack Developer',
      description: 'Built SeatForge 3D engine, SeaLog maritime app, and eRandevu scheduling platform.',
    },
    {
      year: '2022',
      title: 'Frontend Developer',
      description: 'Specialized in Angular and React with focus on performance optimization and design systems.',
    },
    {
      year: '2021',
      title: 'Junior Developer',
      description: 'Started professional journey with web development and mobile applications.',
    },
  ];

  hobbies = [
    { icon: '🎭', name: 'Theatre' },
    { icon: '💻', name: 'Coding' },
    { icon: '📚', name: 'Reading' },
    { icon: '🎮', name: 'Gaming' },
    { icon: '🎵', name: 'Music' },
    { icon: '✈️', name: 'Traveling' },
    { icon: '📸', name: 'Photography' },
    { icon: '🧩', name: 'Puzzles' },
  ];
}
