import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    AfterViewInit,
} from '@angular/core';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

@Component({
    selector: 'app-particle-bg',
    standalone: true,
    template: `
    <canvas #canvas
            class="fixed inset-0 w-full h-full pointer-events-none z-0"
            [style.opacity]="opacity">
    </canvas>
  `,
    styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }
  `]
})
export class ParticleBgComponent implements AfterViewInit, OnDestroy {
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    @Input() particleCount = 120;
    @Input() opacity = 0.8;
    @Input() starColor = '200, 200, 230';
    @Input() nebulaEnabled = true;

    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private animationId = 0;
    private width = 0;
    private height = 0;

    ngAfterViewInit() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;
        this.resize();
        this.initParticles();
        this.animate();

        window.addEventListener('resize', this.onResize);
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.onResize);
    }

    private onResize = () => {
        this.resize();
        this.initParticles();
    };

    private resize() {
        const canvas = this.canvasRef.nativeElement;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        canvas.width = this.width;
        canvas.height = this.height;
    }

    private initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.15,
                speedY: (Math.random() - 0.5) * 0.1,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2,
            });
        }
    }

    private animate = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw nebula blobs
        if (this.nebulaEnabled) {
            this.drawNebula();
        }

        // Draw and update particles
        const time = Date.now() * 0.001;
        for (const p of this.particles) {
            // Twinkle effect
            const twinkle = Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase) * 0.5 + 0.5;
            const alpha = p.opacity * (0.3 + twinkle * 0.7);

            // Draw star
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${this.starColor}, ${alpha})`;
            this.ctx.fill();

            // Subtle glow for larger stars
            if (p.size > 1.2) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(${this.starColor}, ${alpha * 0.1})`;
                this.ctx.fill();
            }

            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around edges
            if (p.x < -10) p.x = this.width + 10;
            if (p.x > this.width + 10) p.x = -10;
            if (p.y < -10) p.y = this.height + 10;
            if (p.y > this.height + 10) p.y = -10;
        }

        this.animationId = requestAnimationFrame(this.animate);
    };

    private drawNebula() {
        // Purple nebula
        const gradient1 = this.ctx.createRadialGradient(
            this.width * 0.3, this.height * 0.4, 0,
            this.width * 0.3, this.height * 0.4, this.width * 0.4
        );
        gradient1.addColorStop(0, 'rgba(124, 58, 237, 0.03)');
        gradient1.addColorStop(0.5, 'rgba(124, 58, 237, 0.01)');
        gradient1.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient1;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Cyan nebula
        const gradient2 = this.ctx.createRadialGradient(
            this.width * 0.7, this.height * 0.6, 0,
            this.width * 0.7, this.height * 0.6, this.width * 0.35
        );
        gradient2.addColorStop(0, 'rgba(6, 214, 160, 0.02)');
        gradient2.addColorStop(0.5, 'rgba(6, 214, 160, 0.005)');
        gradient2.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient2;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}
