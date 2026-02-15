import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());
    theme$ = this.themeSubject.asObservable();

    constructor() {
        this.applyTheme(this.themeSubject.value);
    }

    get currentTheme(): Theme {
        return this.themeSubject.value;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme: Theme) {
        this.themeSubject.next(theme);
        this.applyTheme(theme);
        localStorage.setItem('antigravity-theme', theme);
    }

    private getStoredTheme(): Theme {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('antigravity-theme') as Theme;
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        return 'dark';
    }

    private applyTheme(theme: Theme) {
        if (typeof document !== 'undefined') {
            const html = document.documentElement;
            if (theme === 'dark') {
                html.classList.add('dark');
                html.classList.remove('light');
            } else {
                html.classList.add('light');
                html.classList.remove('dark');
            }
        }
    }
}
