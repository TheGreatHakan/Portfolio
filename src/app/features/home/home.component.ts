import { Component } from '@angular/core';
import { HeroSectionComponent } from './sections/hero/hero-section.component';
import { AboutPreviewSectionComponent } from './sections/about-preview/about-preview-section.component';
import { FeaturedProjectsSectionComponent } from './sections/featured-projects/featured-projects-section.component';
import { StatsSectionComponent } from './sections/stats/stats-section.component';
import { CtaSectionComponent } from './sections/cta/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutPreviewSectionComponent,
    FeaturedProjectsSectionComponent,
    StatsSectionComponent,
    CtaSectionComponent,
  ],
  template: `
    <div class="min-h-screen pt-24">
      <app-hero-section />
      <app-about-preview-section />
      <app-stats-section />
      <app-featured-projects-section />
      <app-cta-section />
    </div>
  `,
})
export class HomeComponent { }
