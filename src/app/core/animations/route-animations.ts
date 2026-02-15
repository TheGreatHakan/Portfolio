import {
    trigger,
    transition,
    style,
    animate,
    query,
    group,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
        /* Both views must be absolute so they stack on top of each other */
        query(':enter, :leave', [
            style({
                position: 'absolute',
                width: '100%',
                top: 0,
                left: 0,
            }),
        ], { optional: true }),

        /* Run both animations in parallel */
        group([
            /* 1) Fade-out the leaving view */
            query(':leave', [
                style({ opacity: 1, transform: 'scale(1)' }),
                animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({
                    opacity: 0,
                    transform: 'scale(0.97)',
                })),
            ], { optional: true }),

            /* 2) Fade-in the entering view */
            query(':enter', [
                style({ opacity: 0, transform: 'translateY(12px) scale(0.97)' }),
                animate('300ms cubic-bezier(0, 0, 0.2, 1)', style({
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                })),
            ], { optional: true }),
        ]),
    ]),
]);
