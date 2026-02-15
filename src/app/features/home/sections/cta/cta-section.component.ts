import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { GlowButtonComponent } from '../../../../shared/components/glow-button/glow-button.component';

@Component({
    selector: 'app-cta-section',
    standalone: true,
    imports: [RouterLink, ScrollRevealDirective, GlowButtonComponent],
    template: `
    <section class="px-6 py-24" appScrollReveal>
      <div class="max-w-3xl mx-auto text-center glass rounded-3xl p-12 sm:p-16 relative overflow-hidden
                  border border-[oklch(0.55_0.25_290/15%)]">
        <!-- Background glow -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[300px] h-[300px] rounded-full
                      bg-[oklch(0.55_0.25_290/8%)] blur-[80px]"></div>
        </div>

        <div class="relative">
          <h2 class="font-display font-bold text-3xl sm:text-4xl mb-4">
            Ready for <span class="gradient-nebula-text">liftoff</span>?
          </h2>
          <p class="text-muted-foreground mb-8 max-w-md mx-auto">
            Let's build something extraordinary together. Whether it's a web app,
            mobile experience, or something entirely new — the cosmos awaits.
          </p>
          <a routerLink="/contact">
            <app-glow-button variant="primary">Get in Touch 🚀</app-glow-button>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class CtaSectionComponent { }
