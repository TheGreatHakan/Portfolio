import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { GlowButtonComponent } from '../../shared/components/glow-button/glow-button.component';
import { ProjectService, Project } from '../../core/services/project.service';

@Component({
    selector: 'app-project-detail',
    standalone: true,
    imports: [RouterLink, ScrollRevealDirective, GlowButtonComponent],
    template: `
    @if (project(); as p) {
      <div class="min-h-screen pt-28 pb-24 px-6">
        <div class="max-w-4xl mx-auto">

          <!-- Back link -->
          <a routerLink="/projects"
             class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground
                    transition-colors mb-8 group">
            <span class="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            All Projects
          </a>

          <!-- Hero -->
          <div class="rounded-3xl overflow-hidden mb-10 relative" appScrollReveal>
            <div class="h-64 sm:h-80 flex items-center justify-center relative"
                 [style.background]="getHeroGradient()">
              <span class="text-8xl sm:text-9xl">{{ p.image }}</span>

              <!-- Decorative blob -->
              <div class="absolute inset-0 pointer-events-none">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-[300px] h-[300px] rounded-full bg-[oklch(0.55_0.25_290/10%)] blur-[60px]"></div>
              </div>
            </div>
          </div>

          <!-- Title + Meta -->
          <div class="mb-8" appScrollReveal>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-xs px-3 py-1 rounded-full gradient-nebula text-white font-bold uppercase tracking-wider">
                {{ p.category }}
              </span>
              @if (p.featured) {
                <span class="text-xs px-3 py-1 rounded-full glass text-muted-foreground">⭐ Featured</span>
              }
            </div>
            <h1 class="font-display font-black text-3xl sm:text-4xl md:text-5xl mb-4">
              {{ p.title }}
            </h1>
            <p class="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {{ p.description }}
            </p>
          </div>

          <!-- Tech Stack -->
          <div class="mb-10" appScrollReveal [revealDelay]="100">
            <h2 class="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground/60 mb-4">
              Technologies
            </h2>
            <div class="flex flex-wrap gap-3">
              @for (tech of p.technologies; track tech) {
                <span class="px-4 py-2 rounded-xl glass text-sm text-foreground font-medium
                             hover:scale-105 hover:border-[oklch(0.55_0.25_290/15%)]
                             border border-transparent transition-all duration-300 cursor-default">
                  {{ tech }}
                </span>
              }
            </div>
          </div>

          <!-- Links -->
          <div class="flex flex-wrap gap-4 mb-16" appScrollReveal [revealDelay]="200">
            @if (p.github) {
              <a [href]="p.github" target="_blank" rel="noopener">
                <app-glow-button variant="secondary">View on GitHub ↗</app-glow-button>
              </a>
            }
            @if (p.live) {
              <a [href]="p.live" target="_blank" rel="noopener">
                <app-glow-button variant="primary">Live Demo ↗</app-glow-button>
              </a>
            }
          </div>

          <!-- More Projects -->
          <div appScrollReveal>
            <div class="glass rounded-2xl p-8 text-center border border-[oklch(0.55_0.25_290/10%)]">
              <p class="text-muted-foreground mb-4">Want to see more?</p>
              <a routerLink="/projects">
                <app-glow-button variant="ghost">Browse All Projects →</app-glow-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <!-- Not Found -->
      <div class="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div class="text-center glass rounded-3xl p-16">
          <div class="text-6xl mb-4">🛸</div>
          <h2 class="font-display font-bold text-2xl mb-3">Project Not Found</h2>
          <p class="text-muted-foreground mb-6">This project may have drifted into another galaxy.</p>
          <a routerLink="/projects">
            <app-glow-button variant="primary">Back to Projects</app-glow-button>
          </a>
        </div>
      </div>
    }
  `,
})
export class ProjectDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private projectService = inject(ProjectService);

    project = signal<Project | undefined>(undefined);

    ngOnInit() {
        const slug = this.route.snapshot.paramMap.get('slug');
        if (slug) {
            this.project.set(this.projectService.getProjectBySlug(slug));
        }
    }

    getHeroGradient(): string {
        return 'linear-gradient(135deg, oklch(0.18 0.10 280), oklch(0.10 0.06 300))';
    }
}
