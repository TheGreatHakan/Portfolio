import { Component, Input } from '@angular/core';
import { MouseGlowDirective } from '../../directives/mouse-glow.directive';

@Component({
    selector: 'app-floating-card',
    standalone: true,
    imports: [MouseGlowDirective],
    template: `
    <div appMouseGlow
         class="glass rounded-2xl p-0 transition-all duration-500
                hover:-translate-y-2 group"
         [class.glow-purple]="glowOnHover"
         [class]="customClass">
      <ng-content />
    </div>
  `,
    styles: [`
    :host {
      display: block;
      animation: float 6s ease-in-out infinite;
      animation-delay: var(--float-delay, 0s);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
  `]
})
export class FloatingCardComponent {
    @Input() glowOnHover = true;
    @Input() customClass = '';
}
