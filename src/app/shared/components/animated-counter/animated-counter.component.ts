import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import { AnimationService } from '../../../core/services/animation.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-animated-counter',
    standalone: true,
    template: `
    <div class="text-center">
      <div class="font-display font-black text-4xl sm:text-5xl gradient-nebula-text mb-2">
        {{ prefix }}{{ displayValue() }}{{ suffix }}
      </div>
      @if (label) {
        <div class="text-sm text-muted-foreground">{{ label }}</div>
      }
    </div>
  `,
})
export class AnimatedCounterComponent implements OnInit, OnDestroy {
    @Input() target = 0;
    @Input() duration = 2000;
    @Input() prefix = '';
    @Input() suffix = '+';
    @Input() label = '';

    displayValue = signal(0);

    private observer!: IntersectionObserver;
    private animSub?: Subscription;
    private hasAnimated = false;

    constructor(
        private el: ElementRef<HTMLElement>,
        private animationService: AnimationService
    ) { }

    ngOnInit() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.hasAnimated = true;
                        this.startAnimation();
                        this.observer.unobserve(this.el.nativeElement);
                    }
                });
            },
            { threshold: 0.3 }
        );

        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
        this.animSub?.unsubscribe();
    }

    private startAnimation() {
        this.animSub = this.animationService
            .animateCounter(this.target, this.duration)
            .subscribe((value) => this.displayValue.set(value));
    }
}
