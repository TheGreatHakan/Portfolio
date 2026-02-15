import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appParallax]',
    standalone: true,
})
export class ParallaxDirective implements OnInit {
    @Input() parallaxSpeed = 0.3;
    @Input() parallaxDirection: 'vertical' | 'horizontal' | 'both' = 'vertical';

    private initialOffset = 0;

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s linear');
    }

    @HostListener('window:scroll')
    onScroll() {
        const rect = this.el.nativeElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only animate when element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrolled = window.scrollY;
            const offset = scrolled * this.parallaxSpeed;

            if (this.parallaxDirection === 'vertical') {
                this.renderer.setStyle(
                    this.el.nativeElement,
                    'transform',
                    `translateY(${offset}px)`
                );
            } else if (this.parallaxDirection === 'horizontal') {
                this.renderer.setStyle(
                    this.el.nativeElement,
                    'transform',
                    `translateX(${offset}px)`
                );
            } else {
                this.renderer.setStyle(
                    this.el.nativeElement,
                    'transform',
                    `translate(${offset * 0.5}px, ${offset}px)`
                );
            }
        }
    }
}
