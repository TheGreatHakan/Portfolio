import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    template: `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
         [class]="scrolled() ? 'glass-strong py-3' : 'py-5'">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg gradient-nebula flex items-center justify-center
                      group-hover:glow-purple transition-shadow duration-300">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 19h20L12 2z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="font-display font-bold text-lg tracking-wide gradient-nebula-text">
            ANTIGRAVITY
          </span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          @for (link of navLinks; track link.path) {
            <a [routerLink]="link.path"
               routerLinkActive="nav-link-active"
               [routerLinkActiveOptions]="{ exact: link.path === '/' }"
               class="nav-link px-4 py-2 rounded-lg text-sm font-medium
                      text-muted-foreground hover:text-foreground
                      transition-all duration-300 relative">
              {{ link.label }}
            </a>
          }
        </div>

        <!-- Mobile Menu Toggle -->
        <button (click)="mobileMenuOpen.set(!mobileMenuOpen())"
                class="md:hidden relative w-10 h-10 rounded-lg glass flex items-center justify-center
                       hover:glow-purple transition-all duration-300"
                [attr.aria-label]="mobileMenuOpen() ? 'Close menu' : 'Open menu'">
          <div class="flex flex-col gap-1.5 w-5">
            <span class="h-0.5 w-full bg-foreground rounded transition-all duration-300"
                  [class.rotate-45]="mobileMenuOpen()"
                  [class.translate-y-2]="mobileMenuOpen()"></span>
            <span class="h-0.5 w-full bg-foreground rounded transition-all duration-300"
                  [class.opacity-0]="mobileMenuOpen()"></span>
            <span class="h-0.5 w-full bg-foreground rounded transition-all duration-300"
                  [class.-rotate-45]="mobileMenuOpen()"
                  [class.-translate-y-2]="mobileMenuOpen()"></span>
          </div>
        </button>
      </div>

      <!-- Mobile Menu -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden glass-strong mt-2 mx-4 rounded-xl p-4 animate-slide-down">
          @for (link of navLinks; track link.path) {
            <a [routerLink]="link.path"
               routerLinkActive="nav-link-active"
               [routerLinkActiveOptions]="{ exact: link.path === '/' }"
               (click)="mobileMenuOpen.set(false)"
               class="block px-4 py-3 rounded-lg text-sm font-medium
                      text-muted-foreground hover:text-foreground hover:bg-white/5
                      transition-all duration-300">
              {{ link.label }}
            </a>
          }
        </div>
      }
    </nav>
  `,
    styles: [`
    :host {
      display: block;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      border-radius: 1px;
      background: linear-gradient(90deg, oklch(0.55 0.25 290), oklch(0.70 0.18 165));
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .nav-link:hover::after,
    .nav-link-active::after {
      width: 60%;
    }

    .nav-link-active {
      color: oklch(0.92 0.01 280) !important;
    }
  `]
})
export class NavbarComponent {
    scrolled = signal(false);
    mobileMenuOpen = signal(false);

    navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Projects' },
        { path: '/blog', label: 'Blog' },
        { path: '/contact', label: 'Contact' },
    ];

    @HostListener('window:scroll')
    onScroll() {
        this.scrolled.set(window.scrollY > 50);
    }
}
