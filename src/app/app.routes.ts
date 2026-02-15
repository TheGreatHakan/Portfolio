import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        data: { animation: 'HomePage' }
    },
    {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
        data: { animation: 'AboutPage' }
    },
    {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
        data: { animation: 'ProjectsPage' }
    },
    {
        path: 'blog',
        loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent),
        data: { animation: 'BlogPage' }
    },
    {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
        data: { animation: 'ContactPage' }
    },
    {
        path: 'projects/:slug',
        loadComponent: () => import('./features/projects/project-detail.component').then(m => m.ProjectDetailComponent),
        data: { animation: 'ProjectDetailPage' }
    },
    {
        path: 'blog/:slug',
        loadComponent: () => import('./features/blog/blog-detail.component').then(m => m.BlogDetailComponent),
        data: { animation: 'BlogDetailPage' }
    },
    { path: '**', redirectTo: '' }
];
