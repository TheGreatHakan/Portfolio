import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { FloatingCardComponent } from '../../../../shared/components/floating-card/floating-card.component';
import { GlowButtonComponent } from '../../../../shared/components/glow-button/glow-button.component';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
    selector: 'app-featured-projects-section',
    standalone: true,
    imports: [
        RouterLink,
        ScrollRevealDirective,
        SectionHeaderComponent,
        FloatingCardComponent,
        GlowButtonComponent,
    ],
    template: `
    <section class="px-6 py-24">
      <app-section-header
        badge="Featured Work"
        preTitle="Latest"
        highlightTitle="Projects"
        subtitle="A selection of recent work across web, mobile, and AI." />

      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (project of featuredProjects; track project.slug; let i = $index) {
          <div appScrollReveal [revealDelay]="i * 120">
            <app-floating-card>
              <!-- Thumbnail -->
              <div class="h-44 relative overflow-hidden rounded-t-2xl flex items-center justify-center"
                   [style.background]="getProjectGradient(i)">
                <span class="text-5xl group-hover:scale-125 transition-transform duration-500">
                  {{ project.image }}
                </span>
              </div>
              <!-- Content -->
              <div class="p-6">
                <h3 class="font-display font-bold text-lg mb-2">{{ project.title }}</h3>
                <p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  @for (tech of project.technologies.slice(0, 3); track tech) {
                    <span class="text-xs px-2.5 py-1 rounded-full glass text-muted-foreground">{{ tech }}</span>
                  }
                  @if (project.technologies.length > 3) {
                    <span class="text-xs px-2.5 py-1 rounded-full glass text-muted-foreground/50">
                      +{{ project.technologies.length - 3 }}
                    </span>
                  }
                </div>
              </div>
            </app-floating-card>
          </div>
        }
      </div>

      <div class="text-center mt-10" appScrollReveal>
        <a routerLink="/projects">
          <app-glow-button variant="ghost">View All Projects →</app-glow-button>
        </a>
      </div>
    </section>
  `,
})
export class FeaturedProjectsSectionComponent {
    private projectService = inject(ProjectService);
    featuredProjects = this.projectService.getFeaturedProjects();

    getProjectGradient(index: number): string {
        const hue = index * 40 + 260;
        return `linear-gradient(135deg, oklch(0.20 0.10 ${hue}), oklch(0.10 0.05 ${hue + 30}))`;
    }
}
