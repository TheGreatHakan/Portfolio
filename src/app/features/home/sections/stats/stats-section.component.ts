import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { AnimatedCounterComponent } from '../../../../shared/components/animated-counter/animated-counter.component';

@Component({
    selector: 'app-stats-section',
    standalone: true,
    imports: [ScrollRevealDirective, AnimatedCounterComponent],
    template: `
    <section class="px-6 py-24" appScrollReveal>
      <div class="max-w-4xl mx-auto glass rounded-3xl p-10 sm:p-14 relative overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute -top-20 -right-20 w-60 h-60 rounded-full
                      bg-[oklch(0.55_0.25_290/5%)] blur-3xl"></div>
          <div class="absolute -bottom-16 -left-16 w-48 h-48 rounded-full
                      bg-[oklch(0.70_0.18_165/4%)] blur-3xl"></div>
        </div>

        <div class="relative grid grid-cols-2 md:grid-cols-4 gap-8">
          @for (stat of stats; track stat.label) {
            <app-animated-counter
              [target]="stat.value"
              [suffix]="stat.suffix"
              [label]="stat.label"
              [duration]="2000" />
          }
        </div>
      </div>
    </section>
  `,
})
export class StatsSectionComponent {
    stats = [
        { value: 5, suffix: '+', label: 'Years Experience' },
        { value: 20, suffix: '+', label: 'Projects Shipped' },
        { value: 50, suffix: 'K+', label: 'Lines of Code' },
        { value: 99, suffix: '%', label: 'Client Satisfaction' },
    ];
}
