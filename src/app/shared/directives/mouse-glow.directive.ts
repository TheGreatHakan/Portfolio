import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appMouseGlow]',
    standalone: true,
})
export class MouseGlowDirective implements OnInit {
    @Input() glowColor = 'oklch(0.55 0.25 290 / 15%)';
    @Input() glowSize = 200;

    private glowElement!: HTMLElement;

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        const host = this.el.nativeElement;
        this.renderer.setStyle(host, 'position', 'relative');
        this.renderer.setStyle(host, 'overflow', 'hidden');

        // Create glow overlay
        this.glowElement = this.renderer.createElement('div');
        this.renderer.setStyle(this.glowElement, 'position', 'absolute');
        this.renderer.setStyle(this.glowElement, 'width', `${this.glowSize}px`);
        this.renderer.setStyle(this.glowElement, 'height', `${this.glowSize}px`);
        this.renderer.setStyle(this.glowElement, 'borderRadius', '50%');
        this.renderer.setStyle(this.glowElement, 'pointerEvents', 'none');
        this.renderer.setStyle(this.glowElement, 'opacity', '0');
        this.renderer.setStyle(this.glowElement, 'transition', 'opacity 0.3s ease');
        this.renderer.setStyle(this.glowElement, 'background',
            `radial-gradient(circle, ${this.glowColor} 0%, transparent 70%)`
        );
        this.renderer.setStyle(this.glowElement, 'transform', 'translate(-50%, -50%)');
        this.renderer.setStyle(this.glowElement, 'zIndex', '0');

        this.renderer.appendChild(host, this.glowElement);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        const rect = this.el.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.renderer.setStyle(this.glowElement, 'left', `${x}px`);
        this.renderer.setStyle(this.glowElement, 'top', `${y}px`);
        this.renderer.setStyle(this.glowElement, 'opacity', '1');
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.renderer.setStyle(this.glowElement, 'opacity', '0');
    }
}
