import { Component, Input, signal, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';
import { GlowButtonComponent } from '../../../../shared/components/glow-button/glow-button.component';

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [RouterLink, ParallaxDirective, GlowButtonComponent],
    template: `
    <section class="relative flex flex-col items-center justify-center min-h-[90vh] px-6 overflow-hidden">

      <!-- Floating decorative shapes with parallax -->
      <div class="absolute inset-0 pointer-events-none">
        <div appParallax [parallaxSpeed]="0.08"
             class="absolute top-1/4 left-[15%] w-3 h-3 rounded-full bg-glow-cyan animate-float opacity-60"></div>
        <div appParallax [parallaxSpeed]="-0.05"
             class="absolute top-1/3 right-[20%] w-2 h-2 rounded-full bg-glow-purple animate-pulse-glow opacity-50"></div>
        <div appParallax [parallaxSpeed]="0.12"
             class="absolute bottom-1/3 left-[10%] w-1.5 h-1.5 rounded-full bg-glow-purple animate-twinkle opacity-40"></div>
        <div appParallax [parallaxSpeed]="-0.1"
             class="absolute top-[45%] right-[12%] w-4 h-4 rounded-full bg-glow-cyan animate-float opacity-30"
             style="animation-delay: -2s"></div>
        <div appParallax [parallaxSpeed]="0.06"
             class="absolute bottom-[25%] right-[35%] w-2 h-2 rounded-full bg-glow-purple animate-pulse-glow opacity-35"
             style="animation-delay: -1.5s"></div>

        <!-- Larger floating geometric shapes -->
        <div appParallax [parallaxSpeed]="-0.03"
             class="absolute top-[20%] right-[30%] w-24 h-24 rounded-full border border-[oklch(0.55_0.25_290/8%)]
                    animate-spin-very-slow opacity-30"></div>
        <div appParallax [parallaxSpeed]="0.04"
             class="absolute bottom-[30%] left-[20%] w-16 h-16 rotate-45
                    border border-[oklch(0.70_0.18_165/6%)] animate-float opacity-20"
             style="animation-delay: -3s"></div>
      </div>

      <!-- Badge -->
      <div class="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                  text-xs text-muted-foreground mb-8 animate-slide-up">
        <span class="w-2 h-2 rounded-full bg-glow-cyan animate-pulse-glow"></span>
        Zero Gravity Digital Experience
      </div>

      <!-- Headline with character animation -->
      <h1 class="relative z-10 font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                 leading-[0.95] mb-6 text-center overflow-hidden">
        <span class="block animate-slide-up" style="animation-delay: 0.1s">DEFY</span>
        <span class="block gradient-nebula-text animate-slide-up" style="animation-delay: 0.2s">GRAVITY</span>
      </h1>

      <!-- Subheadline -->
      <p class="relative z-10 text-muted-foreground text-center max-w-lg text-base sm:text-lg mb-10
                animate-slide-up" style="animation-delay: 0.35s">
        Where code meets the cosmos. Crafting weightless digital experiences
        that push the boundaries of what's possible.
      </p>

      <!-- CTA Buttons -->
      <div class="relative z-10 flex flex-wrap items-center gap-4 animate-slide-up"
           style="animation-delay: 0.5s">
        <a routerLink="/projects">
          <app-glow-button variant="primary">Explore the Void ✦</app-glow-button>
        </a>
        <a routerLink="/about">
          <app-glow-button variant="secondary">Learn More</app-glow-button>
        </a>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 cursor-pointer"
           (click)="scrollToContent()">
        <div class="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <div class="w-1.5 h-3 rounded-full bg-muted-foreground/50 animate-pulse-glow"></div>
        </div>
      </div>
    </section>
  `,
    styles: [`
    @keyframes spin-very-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-very-slow {
      animation: spin-very-slow 30s linear infinite;
    }
  `]
})
export class HeroSectionComponent {
    scrollToContent() {
        const el = document.getElementById('about-preview');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
