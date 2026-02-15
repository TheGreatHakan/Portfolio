import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FloatingCardComponent } from '../../shared/components/floating-card/floating-card.component';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    RouterLink,
    ScrollRevealDirective,
    SectionHeaderComponent,
    FloatingCardComponent,
  ],
  template: `
    <div class="min-h-screen pt-32 pb-24 px-6">
      <div class="max-w-7xl mx-auto">
        <app-section-header
          highlightTitle="Projects"
          subtitle="Exploring the digital cosmos, one project at a time." />

        <!-- Search + Filters -->
        <div class="max-w-3xl mx-auto mb-12 space-y-4" appScrollReveal>
          <!-- Search -->
          <div class="relative">
            <input type="text"
                   [value]="searchTerm()"
                   (input)="onSearchInput($event)"
                   placeholder="Search projects..."
                   class="w-full px-5 py-3 pl-12 rounded-2xl glass border border-[oklch(1_0_0/8%)]
                          bg-transparent text-foreground placeholder-muted-foreground/50
                          focus:outline-none focus:border-[oklch(0.55_0.25_290/30%)]
                          focus:shadow-[0_0_20px_oklch(0.55_0.25_290/8%)]
                          transition-all duration-300 text-sm" />
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <!-- Category Filters -->
          <div class="flex flex-wrap justify-center gap-3">
            @for (cat of categories; track cat) {
              <button (click)="activeCategory.set(cat)"
                      class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                      [class]="activeCategory() === cat
                        ? 'gradient-nebula text-white shadow-lg shadow-[oklch(0.55_0.25_290/25%)]'
                        : 'glass text-muted-foreground hover:text-foreground hover:scale-105'">
                {{ cat }}
              </button>
            }
          </div>
        </div>

        <!-- Results count -->
        @if (searchTerm()) {
          <p class="text-sm text-muted-foreground text-center mb-6">
            {{ filteredProjects().length }} result{{ filteredProjects().length !== 1 ? 's' : '' }}
            for "{{ searchTerm() }}"
          </p>
        }

        <!-- Project Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of filteredProjects(); track project.slug; let i = $index) {
            <div appScrollReveal [revealDelay]="i * 80">
              <a [routerLink]="['/projects', project.slug]" class="block">
                <app-floating-card>
                  <!-- Thumbnail -->
                  <div class="h-48 relative overflow-hidden rounded-t-2xl flex items-center justify-center
                              group-hover:scale-[1.02] transition-transform duration-500"
                       [style.background]="getProjectGradient(i)">
                    <span class="text-6xl group-hover:scale-125 transition-transform duration-500">
                      {{ project.image }}
                    </span>
                    <!-- Category badge overlay -->
                    <span class="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full
                                 glass text-muted-foreground/80 uppercase tracking-wider font-medium">
                      {{ project.category }}
                    </span>
                  </div>
                  <!-- Content -->
                  <div class="p-6">
                    <h3 class="font-display font-bold text-lg mb-2 group-hover:gradient-nebula-text
                               transition-all duration-300">
                      {{ project.title }}
                    </h3>
                    <p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {{ project.description }}
                    </p>
                    <!-- Tech stack -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      @for (tech of project.technologies.slice(0, 4); track tech) {
                        <span class="text-xs px-2.5 py-1 rounded-full glass text-muted-foreground">
                          {{ tech }}
                        </span>
                      }
                      @if (project.technologies.length > 4) {
                        <span class="text-xs px-2.5 py-1 rounded-full glass text-muted-foreground/50">
                          +{{ project.technologies.length - 4 }}
                        </span>
                      }
                    </div>
                    <!-- Links -->
                    <div class="flex items-center gap-4 text-sm">
                      @if (project.github) {
                        <span class="text-muted-foreground hover:text-foreground transition-colors"
                              (click)="openLink($event, project.github)">
                          GitHub →
                        </span>
                      }
                      @if (project.live) {
                        <span class="gradient-nebula-text font-semibold hover:opacity-80 transition-opacity"
                              (click)="openLink($event, project.live)">
                          Live Demo →
                        </span>
                      }
                    </div>
                  </div>
                </app-floating-card>
              </a>
            </div>
          }
        </div>

        <!-- Empty state -->
        @if (filteredProjects().length === 0) {
          <div class="text-center py-20 glass rounded-3xl mt-6">
            <div class="text-5xl mb-4">🔭</div>
            <h3 class="font-display font-bold text-lg mb-2">No projects found</h3>
            <p class="text-sm text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        }
      </div>
    </div>
  `,
})
export class ProjectsComponent {
  private projectService = inject(ProjectService);

  searchTerm = signal('');
  activeCategory = signal('All');
  categories = this.projectService.getCategories();

  filteredProjects = computed(() => {
    const projects = this.projectService.getProjectsByCategory(this.activeCategory());
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return projects;
    return projects.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.technologies.some(t => t.toLowerCase().includes(term))
    );
  });

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  openLink(event: Event, url: string) {
    event.preventDefault();
    event.stopPropagation();
    window.open(url, '_blank', 'noopener');
  }

  getProjectGradient(index: number): string {
    const hue = index * 40 + 260;
    return `linear-gradient(135deg, oklch(0.20 0.10 ${hue}), oklch(0.10 0.05 ${hue + 30}))`;
  }
}
