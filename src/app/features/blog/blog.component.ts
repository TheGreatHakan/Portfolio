import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FloatingCardComponent } from '../../shared/components/floating-card/floating-card.component';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective, SectionHeaderComponent, FloatingCardComponent],
  template: `
    <div class="min-h-screen pt-32 pb-24 px-6">
      <div class="max-w-5xl mx-auto">
        <app-section-header
          badge="Transmissions"
          preTitle="From the"
          highlightTitle="Cosmos"
          subtitle="Thoughts on code, design, and everything in between." />

        <!-- Search + Filters -->
        <div class="max-w-2xl mx-auto mb-12 space-y-4" appScrollReveal>
          <!-- Search -->
          <div class="relative">
            <input type="text"
                   [value]="searchTerm()"
                   (input)="onSearchInput($event)"
                   placeholder="Search articles..."
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
          <!-- Categories -->
          <div class="flex flex-wrap justify-center gap-3">
            @for (cat of categories; track cat) {
              <button (click)="activeCategory.set(cat)"
                      class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
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
            {{ filteredPosts().length }} result{{ filteredPosts().length !== 1 ? 's' : '' }}
            for "{{ searchTerm() }}"
          </p>
        }

        <!-- Featured Post (first post, only when no search/filter) -->
        @if (!searchTerm() && activeCategory() === 'All' && filteredPosts().length > 0) {
          <div appScrollReveal class="mb-10">
            <a [routerLink]="['/blog', filteredPosts()[0].slug]" class="block group">
              <div class="glass rounded-3xl overflow-hidden border border-transparent
                          hover:border-[oklch(0.55_0.25_290/15%)] transition-all duration-300">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <!-- Thumbnail -->
                  <div class="h-56 md:h-full flex items-center justify-center relative"
                       [style.background]="'linear-gradient(135deg, oklch(0.18 0.10 280), oklch(0.12 0.06 300))'">
                    <span class="text-7xl group-hover:scale-110 transition-transform duration-500">
                      {{ filteredPosts()[0].image }}
                    </span>
                    <span class="absolute top-4 left-4 text-[10px] px-2.5 py-1 rounded-full
                                 gradient-nebula text-white font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <!-- Content -->
                  <div class="p-8 flex flex-col justify-center">
                    <span class="text-xs px-2.5 py-1 rounded-full glass text-muted-foreground/80 w-fit mb-3">
                      {{ filteredPosts()[0].category }}
                    </span>
                    <h2 class="font-display font-bold text-xl md:text-2xl mb-3 group-hover:gradient-nebula-text
                               transition-all duration-300">
                      {{ filteredPosts()[0].title }}
                    </h2>
                    <p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {{ filteredPosts()[0].excerpt }}
                    </p>
                    <div class="flex items-center gap-3 text-xs text-muted-foreground/50">
                      <span>{{ formatDate(filteredPosts()[0].date) }}</span>
                      <span>·</span>
                      <span>{{ filteredPosts()[0].readTime }} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        }

        <!-- Post Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (post of displayPosts(); track post.slug; let i = $index) {
            <div appScrollReveal [revealDelay]="i * 80">
              <a [routerLink]="['/blog', post.slug]" class="block h-full">
                <app-floating-card>
                  <!-- Thumbnail -->
                  <div class="h-40 relative overflow-hidden rounded-t-2xl flex items-center justify-center"
                       [style.background]="getPostGradient(i)">
                    <span class="text-5xl group-hover:scale-125 transition-transform duration-500">
                      {{ post.image }}
                    </span>
                    <span class="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full
                                 glass text-muted-foreground/80 uppercase tracking-wider">
                      {{ post.category }}
                    </span>
                  </div>
                  <!-- Content -->
                  <div class="p-5 flex flex-col">
                    <h3 class="font-display font-bold text-base mb-2 line-clamp-2
                               group-hover:gradient-nebula-text transition-all duration-300">
                      {{ post.title }}
                    </h3>
                    <p class="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
                      {{ post.excerpt }}
                    </p>
                    <div class="flex items-center justify-between text-xs text-muted-foreground/50">
                      <span>{{ formatDate(post.date) }}</span>
                      <span>{{ post.readTime }} min read</span>
                    </div>
                  </div>
                </app-floating-card>
              </a>
            </div>
          }
        </div>

        <!-- Empty state -->
        @if (filteredPosts().length === 0) {
          <div class="text-center py-20 glass rounded-3xl mt-6">
            <div class="text-5xl mb-4">📡</div>
            <h3 class="font-display font-bold text-lg mb-2">No transmissions found</h3>
            <p class="text-sm text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        }
      </div>
    </div>
  `,
})
export class BlogComponent {
  private blogService = inject(BlogService);

  searchTerm = signal('');
  activeCategory = signal('All');
  categories = this.blogService.getCategories();

  filteredPosts = computed(() => {
    const posts = this.blogService.getPostsByCategory(this.activeCategory());
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return posts;
    return posts.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.excerpt.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    );
  });

  // Skip first post in grid when showing featured hero card
  displayPosts = computed(() => {
    if (!this.searchTerm() && this.activeCategory() === 'All') {
      return this.filteredPosts().slice(1);
    }
    return this.filteredPosts();
  });

  onSearchInput(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  }

  getPostGradient(index: number): string {
    const hue = index * 50 + 240;
    return `linear-gradient(135deg, oklch(0.18 0.08 ${hue}), oklch(0.10 0.04 ${hue + 30}))`;
  }
}
