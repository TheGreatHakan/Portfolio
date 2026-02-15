import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ScrollState {
    scrollY: number;
    scrollPercent: number;
    direction: 'up' | 'down';
}

@Injectable({ providedIn: 'root' })
export class AnimationService {
    private scrollSubject = new Subject<ScrollState>();
    private lastScrollY = 0;
    private ticking = false;

    scroll$ = this.scrollSubject.asObservable();

    constructor(private ngZone: NgZone) {
        this.initScrollListener();
    }

    private initScrollListener() {
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('scroll', () => {
                if (!this.ticking) {
                    requestAnimationFrame(() => {
                        const scrollY = window.scrollY;
                        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                        const scrollPercent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

                        this.scrollSubject.next({
                            scrollY,
                            scrollPercent,
                            direction: scrollY > this.lastScrollY ? 'down' : 'up',
                        });

                        this.lastScrollY = scrollY;
                        this.ticking = false;
                    });
                    this.ticking = true;
                }
            }, { passive: true });
        });
    }

    /**
     * Animate a number from 0 to target using requestAnimationFrame.
     * Returns an Observable that emits the current value on each frame.
     */
    animateCounter(target: number, duration = 2000): Observable<number> {
        return new Observable((observer) => {
            let startTime: number | null = null;
            let animationId: number;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                observer.next(current);

                if (progress < 1) {
                    animationId = requestAnimationFrame(animate);
                } else {
                    observer.next(target);
                    observer.complete();
                }
            };

            animationId = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationId);
        });
    }
}
