import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { FloatingCardComponent } from '../../../../shared/components/floating-card/floating-card.component';

@Component({
    selector: 'app-about-preview-section',
    standalone: true,
    imports: [ScrollRevealDirective, SectionHeaderComponent, FloatingCardComponent],
    template: `
    <section id="about-preview" class="px-6 py-24">
      <app-section-header
        badge="What I Do"
        preTitle="Crafting"
        highlightTitle="Digital Experiences"
        subtitle="Full-stack developer specializing in immersive, high-performance web and mobile applications." />

      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (feature of features; track feature.title; let i = $index) {
          <div appScrollReveal [revealDelay]="i * 100">
            <app-floating-card>
              <div class="p-6 sm:p-7">
                <div class="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl mb-4
                            group-hover:scale-110 transition-transform duration-300">
                  {{ feature.icon }}
                </div>
                <h3 class="font-display font-bold text-lg mb-2">{{ feature.title }}</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
              </div>
            </app-floating-card>
          </div>
        }
      </div>
    </section>
  `,
})
export class AboutPreviewSectionComponent {
    features = [
        {
            icon: '🚀',
            title: 'Performance First',
            description: 'Optimized for speed with lazy loading, SSR, and modern web APIs. Every millisecond counts.',
        },
        {
            icon: '🎨',
            title: 'Design Systems',
            description: 'Scalable UI systems with consistent tokens, components, and design patterns that grow with your product.',
        },
        {
            icon: '⚡',
            title: 'Full-Stack',
            description: 'From pixel-perfect UIs to robust backends, APIs, cloud infrastructure, and CI/CD pipelines.',
        },
        {
            icon: '📱',
            title: 'Cross-Platform',
            description: 'Native-quality mobile apps with Flutter alongside responsive web experiences that feel at home anywhere.',
        },
        {
            icon: '🤖',
            title: 'AI Integration',
            description: 'Machine learning pipelines, LLM integrations, and intelligent automation powering next-gen products.',
        },
        {
            icon: '🔐',
            title: 'Security & A11y',
            description: 'Accessible-first development with WCAG compliance, secure auth, and privacy-by-design architecture.',
        },
    ];
}
