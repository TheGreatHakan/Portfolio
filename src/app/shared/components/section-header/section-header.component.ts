import { Component, Input } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
    selector: 'app-section-header',
    standalone: true,
    imports: [ScrollRevealDirective],
    template: `
    <div class="text-center mb-16" appScrollReveal>
      @if (badge) {
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                    text-xs text-muted-foreground mb-6">
          <span class="w-2 h-2 rounded-full bg-glow-cyan animate-pulse-glow"></span>
          <span>{{ badge }}</span>
        </div>
      }
      <h2 class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
        @if (preTitle) {
          <span>{{ preTitle }} </span>
        }
        <span class="gradient-nebula-text">{{ highlightTitle }}</span>
        @if (postTitle) {
          <span> {{ postTitle }}</span>
        }
      </h2>
      @if (subtitle) {
        <p class="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          {{ subtitle }}
        </p>
      }
    </div>
  `,
})
export class SectionHeaderComponent {
    @Input() badge?: string;
    @Input() preTitle?: string;
    @Input() highlightTitle = '';
    @Input() postTitle?: string;
    @Input() subtitle?: string;
}
