import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ParticleBgComponent } from './shared/components/particle-bg/particle-bg.component';
import { routeAnimations } from './core/animations/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ParticleBgComponent],
  animations: [routeAnimations],
  template: `
    <div class="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <!-- Particle starfield background -->
      <app-particle-bg [particleCount]="140" />

      <!-- Mouse-follow glow effect -->
      <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div class="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl transition-all duration-700 ease-out"
             style="background: radial-gradient(circle, oklch(0.55 0.25 290) 0%, transparent 70%);
                    left: var(--mouse-x, 50%); top: var(--mouse-y, 50%);
                    transform: translate(-50%, -50%)">
        </div>
      </div>

      <app-navbar />

      <main class="relative z-10 flex-1 w-full" [@routeAnimations]="getRouteAnimationData()">
        <router-outlet />
      </main>

      <app-footer />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  host: {
    '(document:mousemove)': 'onMouseMove($event)'
  }
})
export class App {
  constructor(private contexts: ChildrenOutletContexts) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  onMouseMove(event: MouseEvent) {
    document.documentElement.style.setProperty('--mouse-x', event.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', event.clientY + 'px');
  }
}
