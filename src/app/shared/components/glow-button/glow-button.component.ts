import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-glow-button',
    standalone: true,
    template: `
    <button [type]="type"
            [disabled]="disabled"
            class="glow-btn relative overflow-hidden font-display font-semibold text-sm
                   transition-all duration-300 active:scale-[0.97]"
            [class]="variantClasses">
      <span class="relative z-10 flex items-center justify-center gap-2">
        <ng-content />
      </span>
      <div class="glow-btn-shimmer absolute inset-0 opacity-0 transition-opacity duration-300"></div>
    </button>
  `,
    styles: [`
    .glow-btn {
      border-radius: 0.75rem;
    }

    .glow-btn-primary {
      background: linear-gradient(135deg, oklch(0.55 0.25 290) 0%, oklch(0.70 0.18 165) 100%);
      color: white;
      padding: 0.875rem 2rem;
    }
    .glow-btn-primary:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px oklch(0.55 0.25 290 / 30%),
                  0 0 60px oklch(0.55 0.25 290 / 10%);
    }

    .glow-btn-secondary {
      background: oklch(0.14 0.03 280 / 60%);
      backdrop-filter: blur(16px);
      border: 1px solid oklch(1 0 0 / 8%);
      color: oklch(0.92 0.01 280);
      padding: 0.875rem 2rem;
    }
    .glow-btn-secondary:hover {
      background: oklch(1 0 0 / 10%);
      transform: scale(1.03);
    }

    .glow-btn-ghost {
      background: transparent;
      color: oklch(0.72 0.15 290);
      padding: 0.5rem 1rem;
    }
    .glow-btn-ghost:hover {
      background: oklch(0.55 0.25 290 / 10%);
    }

    .glow-btn-shimmer {
      background: linear-gradient(90deg, transparent, oklch(1 0 0 / 10%), transparent);
      background-size: 200% 100%;
    }
    .glow-btn:hover .glow-btn-shimmer {
      opacity: 1;
      animation: shimmer 1.5s linear infinite;
    }

    .glow-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `]
})
export class GlowButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
    @Input() type: 'button' | 'submit' = 'button';
    @Input() disabled = false;

    get variantClasses(): string {
        return `glow-btn-${this.variant}`;
    }
}
