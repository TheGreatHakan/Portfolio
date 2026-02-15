import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { FloatingCardComponent } from '../../shared/components/floating-card/floating-card.component';
import { GlowButtonComponent } from '../../shared/components/glow-button/glow-button.component';
import { BlogService, BlogPost } from '../../core/services/blog.service';

@Component({
    selector: 'app-blog-detail',
    standalone: true,
    imports: [RouterLink, ScrollRevealDirective, FloatingCardComponent, GlowButtonComponent],
    template: `
    @if (post(); as p) {
      <div class="min-h-screen pt-28 pb-24 px-6">
        <div class="max-w-3xl mx-auto">

          <!-- Back link -->
          <a routerLink="/blog"
             class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground
                    transition-colors mb-8 group">
            <span class="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            All Posts
          </a>

          <!-- Article Header -->
          <header class="mb-10" appScrollReveal>
            <div class="flex items-center gap-3 mb-4">
              <span class="text-xs px-3 py-1 rounded-full gradient-nebula text-white font-bold uppercase tracking-wider">
                {{ p.category }}
              </span>
              @if (p.featured) {
                <span class="text-xs px-3 py-1 rounded-full glass text-muted-foreground">⭐ Featured</span>
              }
            </div>
            <h1 class="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              {{ p.title }}
            </h1>
            <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/60">
              <span>{{ formatDate(p.date) }}</span>
              <span>·</span>
              <span>{{ p.readTime }} min read</span>
            </div>
          </header>

          <!-- Hero Image -->
          <div class="rounded-2xl overflow-hidden mb-10 relative" appScrollReveal>
            <div class="h-56 sm:h-72 flex items-center justify-center relative"
                 style="background: linear-gradient(135deg, oklch(0.18 0.10 280), oklch(0.10 0.06 300))">
              <span class="text-8xl sm:text-9xl">{{ p.image }}</span>
              <div class="absolute inset-0 pointer-events-none">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-[250px] h-[250px] rounded-full bg-[oklch(0.55_0.25_290/8%)] blur-[50px]"></div>
              </div>
            </div>
          </div>

          <!-- Article Content -->
          <article class="prose-cosmic mb-16" appScrollReveal [revealDelay]="100"
                   [innerHTML]="renderedContent()">
          </article>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-12" appScrollReveal>
            @for (tag of p.tags; track tag) {
              <span class="text-xs px-3 py-1.5 rounded-full glass text-muted-foreground
                           hover:text-foreground hover:scale-105 transition-all duration-300 cursor-default">
                #{{ tag }}
              </span>
            }
          </div>

          <!-- Related Posts -->
          @if (relatedPosts().length > 0) {
            <div appScrollReveal>
              <h2 class="font-display font-bold text-xl mb-6">
                Related <span class="gradient-nebula-text">Transmissions</span>
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                @for (related of relatedPosts(); track related.slug; let i = $index) {
                  <a [routerLink]="['/blog', related.slug]" class="block group">
                    <app-floating-card>
                      <div class="h-28 flex items-center justify-center rounded-t-2xl"
                           [style.background]="'linear-gradient(135deg, oklch(0.18 0.08 ' + (i * 50 + 260) + '), oklch(0.10 0.04 ' + (i * 50 + 290) + '))'">
                        <span class="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {{ related.image }}
                        </span>
                      </div>
                      <div class="p-4">
                        <h4 class="font-display font-bold text-sm line-clamp-2 group-hover:gradient-nebula-text
                                   transition-all duration-300">
                          {{ related.title }}
                        </h4>
                        <p class="text-xs text-muted-foreground/50 mt-1">{{ related.readTime }} min read</p>
                      </div>
                    </app-floating-card>
                  </a>
                }
              </div>
            </div>
          }

          <!-- Back CTA -->
          <div class="mt-12 text-center" appScrollReveal>
            <div class="glass rounded-2xl p-8 border border-[oklch(0.55_0.25_290/10%)]">
              <p class="text-muted-foreground mb-4">Enjoyed this post?</p>
              <a routerLink="/blog">
                <app-glow-button variant="ghost">Browse All Posts →</app-glow-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <!-- Not Found -->
      <div class="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div class="text-center glass rounded-3xl p-16">
          <div class="text-6xl mb-4">📡</div>
          <h2 class="font-display font-bold text-2xl mb-3">Post Not Found</h2>
          <p class="text-muted-foreground mb-6">This transmission may have been lost in space.</p>
          <a routerLink="/blog">
            <app-glow-button variant="primary">Back to Blog</app-glow-button>
          </a>
        </div>
      </div>
    }
  `,
    styles: [`
    :host ::ng-deep .prose-cosmic {
      color: oklch(0.75 0 0);
      line-height: 1.8;
      font-size: 0.95rem;
    }
    :host ::ng-deep .prose-cosmic h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.5rem;
      color: oklch(0.92 0 0);
      margin: 2rem 0 1rem;
    }
    :host ::ng-deep .prose-cosmic h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 1.2rem;
      color: oklch(0.88 0 0);
      margin: 1.5rem 0 0.75rem;
    }
    :host ::ng-deep .prose-cosmic p {
      margin: 0.75rem 0;
    }
    :host ::ng-deep .prose-cosmic strong {
      color: oklch(0.90 0 0);
    }
    :host ::ng-deep .prose-cosmic code {
      background: oklch(0.15 0.02 280 / 60%);
      padding: 0.15rem 0.4rem;
      border-radius: 0.375rem;
      font-size: 0.85em;
      color: oklch(0.70 0.18 165);
    }
    :host ::ng-deep .prose-cosmic pre {
      background: oklch(0.12 0.02 280 / 80%);
      border: 1px solid oklch(1 0 0 / 8%);
      border-radius: 0.75rem;
      padding: 1.25rem;
      overflow-x: auto;
      margin: 1.25rem 0;
    }
    :host ::ng-deep .prose-cosmic pre code {
      background: none;
      padding: 0;
      color: oklch(0.80 0.10 165);
      font-size: 0.85rem;
      line-height: 1.6;
    }
    :host ::ng-deep .prose-cosmic ol,
    :host ::ng-deep .prose-cosmic ul {
      padding-left: 1.5rem;
      margin: 0.75rem 0;
    }
    :host ::ng-deep .prose-cosmic li {
      margin: 0.35rem 0;
    }
    :host ::ng-deep .prose-cosmic hr {
      border-color: oklch(1 0 0 / 8%);
      margin: 2rem 0;
    }
    :host ::ng-deep .prose-cosmic table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.25rem 0;
    }
    :host ::ng-deep .prose-cosmic th,
    :host ::ng-deep .prose-cosmic td {
      padding: 0.5rem 0.75rem;
      border: 1px solid oklch(1 0 0 / 10%);
      text-align: left;
    }
    :host ::ng-deep .prose-cosmic th {
      background: oklch(0.15 0.02 280 / 40%);
      font-weight: 600;
      color: oklch(0.90 0 0);
    }
  `],
})
export class BlogDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private blogService = inject(BlogService);

    post = signal<BlogPost | undefined>(undefined);
    relatedPosts = signal<BlogPost[]>([]);
    renderedContent = signal('');

    ngOnInit() {
        const slug = this.route.snapshot.paramMap.get('slug');
        if (slug) {
            const p = this.blogService.getPostBySlug(slug);
            this.post.set(p);
            if (p) {
                this.relatedPosts.set(this.blogService.getRelatedPosts(slug));
                this.renderedContent.set(this.markdownToHtml(p.content));
            }
        }
    }

    formatDate(dateStr: string): string {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
        });
    }

    /**
     * Basic markdown → HTML for blog content
     * Handles: headings, code blocks, inline code, bold, lists, tables, hr, paragraphs
     */
    private markdownToHtml(md: string): string {
        let html = md;

        // Fenced code blocks (```lang ... ```)
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_m, _lang, code) => {
            return `<pre><code>${this.escapeHtml(code.trim())}</code></pre>`;
        });

        // Tables
        html = html.replace(/^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/gm, (_m, header, _sep, body) => {
            const headerCells = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th>${c.trim()}</th>`).join('');
            const rows = body.trim().split('\n').map((row: string) => {
                const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('');
                return `<tr>${cells}</tr>`;
            }).join('');
            return `<table><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table>`;
        });

        // Headings
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

        // Horizontal rules
        html = html.replace(/^---$/gm, '<hr>');

        // Bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Inline code (after code blocks to avoid conflict)
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Unordered lists
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);

        // Ordered lists
        html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

        // Paragraphs (lines not already wrapped)
        const lines = html.split('\n');
        html = lines.map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            if (trimmed.startsWith('<')) return line;
            return `<p>${line}</p>`;
        }).join('\n');

        return html;
    }

    private escapeHtml(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}
