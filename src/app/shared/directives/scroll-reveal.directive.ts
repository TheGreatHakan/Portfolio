import {
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appScrollReveal]',
    standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
    @Input() revealDelay = 0;
    @Input() revealDistance = '30px';
    @Input() revealDuration = '0.6s';

    private observer!: IntersectionObserver;

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        const element = this.el.nativeElement;

        // Initial hidden state
        this.renderer.setStyle(element, 'opacity', '0');
        this.renderer.setStyle(element, 'transform', `translateY(${this.revealDistance})`);
        this.renderer.setStyle(element, 'transition',
            `opacity ${this.revealDuration} cubic-bezier(0.4, 0, 0.2, 1) ${this.revealDelay}ms, ` +
            `transform ${this.revealDuration} cubic-bezier(0.4, 0, 0.2, 1) ${this.revealDelay}ms`
        );

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.renderer.setStyle(element, 'opacity', '1');
                        this.renderer.setStyle(element, 'transform', 'translateY(0)');
                        this.observer.unobserve(element);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        this.observer.observe(element);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
