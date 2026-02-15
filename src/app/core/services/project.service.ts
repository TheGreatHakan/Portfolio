import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Project {
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    category: string;
    technologies: string[];
    image: string;
    github?: string;
    live?: string;
    featured?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private projectsSubject = new BehaviorSubject<Project[]>(this.getProjects());
    projects$ = this.projectsSubject.asObservable();

    getProjectBySlug(slug: string): Project | undefined {
        return this.projectsSubject.value.find(p => p.slug === slug);
    }

    getFeaturedProjects(): Project[] {
        return this.projectsSubject.value.filter(p => p.featured);
    }

    getProjectsByCategory(category: string): Project[] {
        if (category === 'All') return this.projectsSubject.value;
        return this.projectsSubject.value.filter(p => p.category === category);
    }

    getCategories(): string[] {
        const cats = new Set(this.projectsSubject.value.map(p => p.category));
        return ['All', ...Array.from(cats)];
    }

    private getProjects(): Project[] {
        return [
            {
                slug: 'antigravity-portfolio',
                title: 'Antigravity Portfolio',
                description: 'A cosmic-themed portfolio website built with Angular 19 and ZardUI with immersive design.',
                longDescription: 'Full-featured portfolio site featuring glassmorphism UI, canvas particle backgrounds, scroll-triggered animations, and route transitions. Built entirely with Angular 19 standalone components and ZardUI.',
                category: 'Web',
                technologies: ['Angular', 'ZardUI', 'TailwindCSS', 'Vite', 'RxJS'],
                image: '🌌',
                github: 'https://github.com',
                live: '#',
                featured: true,
            },
            {
                slug: 'sealog-navigator',
                title: 'SeaLog Navigator',
                description: 'Maritime digital logbook application with real-time tracking and watch management system.',
                longDescription: 'A comprehensive maritime logbook featuring GPS tracking, watch schedule management, weather logging, and crew assignments. Built with Flutter for cross-platform mobile support.',
                category: 'Mobile',
                technologies: ['Flutter', 'Dart', 'Firebase', 'GPS'],
                image: '⛵',
                github: 'https://github.com',
                featured: true,
            },
            {
                slug: 'seatforge-engine',
                title: 'SeatForge Engine',
                description: '3D venue seat layout generator with customizable geometry builders and real-time rendering.',
                longDescription: 'A powerful 3D rendering engine for creating venue seat layouts. Features V2 geometry builders, custom stair/floor/level generation, and real-time Three.js previews.',
                category: 'Web',
                technologies: ['React', 'Three.js', 'TypeScript', 'Vite'],
                image: '🎭',
                github: 'https://github.com',
                live: '#',
                featured: true,
            },
            {
                slug: 'healthtracker-ai',
                title: 'HealthTracker AI',
                description: 'AI-powered health monitoring app with habit tracking and intelligent recommendations.',
                category: 'AI',
                technologies: ['Flutter', 'TensorFlow', 'Firebase', 'Dart'],
                image: '🏥',
                github: 'https://github.com',
                featured: false,
            },
            {
                slug: 'erandevu-platform',
                title: 'eRandevu Platform',
                description: 'Online appointment scheduling system with multi-staff management and analytics dashboard.',
                longDescription: 'Full-featured appointment platform with onboarding wizard, staff management, industry-specific templates, and real-time scheduling. Angular-based SPA with responsive admin dashboard.',
                category: 'Web',
                technologies: ['Angular', 'Node.js', 'MongoDB', 'RxJS'],
                image: '📅',
                github: 'https://github.com',
                live: '#',
                featured: true,
            },
            {
                slug: 'api-gateway',
                title: 'API Gateway Service',
                description: 'Microservice-based API gateway with rate limiting, caching, and authentication middleware.',
                category: 'Backend',
                technologies: ['Node.js', 'Express', 'Redis', 'Docker'],
                image: '⚡',
                github: 'https://github.com',
                featured: false,
            },
        ];
    }
}
