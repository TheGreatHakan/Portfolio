import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FloatingCardComponent } from '../../shared/components/floating-card/floating-card.component';
import { GlowButtonComponent } from '../../shared/components/glow-button/glow-button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ScrollRevealDirective,
    SectionHeaderComponent,
    FloatingCardComponent,
    GlowButtonComponent,
  ],
  template: `
    <div class="min-h-screen pt-32 pb-24 px-6">
      <div class="max-w-4xl mx-auto">
        <app-section-header
          badge="Say Hello"
          preTitle="Let's"
          highlightTitle="Connect"
          subtitle="Ready to build something out of this world?" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

          <!-- Contact Form -->
          <div appScrollReveal>
            <app-floating-card [glowOnHover]="false">
              <div class="p-8">
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5">

                  <!-- Name -->
                  <div class="relative">
                    <input type="text"
                           formControlName="name"
                           placeholder=" "
                           id="name"
                           class="peer w-full px-4 py-3 pt-6 rounded-xl glass border bg-transparent
                                  text-foreground transition-all duration-300
                                  focus:outline-none focus:shadow-[0_0_15px_oklch(0.55_0.25_290/10%)]"
                           [class]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched
                             ? 'border-red-500/40'
                             : 'border-[oklch(1_0_0/8%)] focus:border-[oklch(0.55_0.25_290/40%)]'" />
                    <label for="name"
                           class="absolute left-4 top-2 text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider
                                  transition-all duration-200
                                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                                  peer-placeholder-shown:text-muted-foreground/50 peer-placeholder-shown:uppercase-none
                                  peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
                                  peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-medium
                                  peer-focus:tracking-wider peer-focus:uppercase">
                      Name
                    </label>
                    @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                      <p class="text-[10px] text-red-400 mt-1 ml-1">Name is required</p>
                    }
                  </div>

                  <!-- Email -->
                  <div class="relative">
                    <input type="email"
                           formControlName="email"
                           placeholder=" "
                           id="email"
                           class="peer w-full px-4 py-3 pt-6 rounded-xl glass border bg-transparent
                                  text-foreground transition-all duration-300
                                  focus:outline-none focus:shadow-[0_0_15px_oklch(0.55_0.25_290/10%)]"
                           [class]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched
                             ? 'border-red-500/40'
                             : 'border-[oklch(1_0_0/8%)] focus:border-[oklch(0.55_0.25_290/40%)]'" />
                    <label for="email"
                           class="absolute left-4 top-2 text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider
                                  transition-all duration-200
                                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                                  peer-placeholder-shown:text-muted-foreground/50 peer-placeholder-shown:uppercase-none
                                  peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
                                  peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-medium
                                  peer-focus:tracking-wider peer-focus:uppercase">
                      Email
                    </label>
                    @if (contactForm.get('email')?.hasError('required') && contactForm.get('email')?.touched) {
                      <p class="text-[10px] text-red-400 mt-1 ml-1">Email is required</p>
                    } @else if (contactForm.get('email')?.hasError('email') && contactForm.get('email')?.touched) {
                      <p class="text-[10px] text-red-400 mt-1 ml-1">Please enter a valid email</p>
                    }
                  </div>

                  <!-- Message -->
                  <div class="relative">
                    <textarea formControlName="message"
                              placeholder=" "
                              id="message"
                              rows="5"
                              class="peer w-full px-4 py-3 pt-6 rounded-xl glass border bg-transparent
                                     text-foreground transition-all duration-300 resize-none
                                     focus:outline-none focus:shadow-[0_0_15px_oklch(0.55_0.25_290/10%)]"
                              [class]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched
                                ? 'border-red-500/40'
                                : 'border-[oklch(1_0_0/8%)] focus:border-[oklch(0.55_0.25_290/40%)]'"></textarea>
                    <label for="message"
                           class="absolute left-4 top-2 text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider
                                  transition-all duration-200
                                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                                  peer-placeholder-shown:text-muted-foreground/50 peer-placeholder-shown:uppercase-none
                                  peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
                                  peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-medium
                                  peer-focus:tracking-wider peer-focus:uppercase">
                      Message
                    </label>
                    @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                      <p class="text-[10px] text-red-400 mt-1 ml-1">
                        Message must be at least 10 characters
                      </p>
                    }
                  </div>

                  <app-glow-button variant="primary" type="submit"
                                   [disabled]="contactForm.invalid || formStatus() === 'sending'">
                    @switch (formStatus()) {
                      @case ('idle') { Send Message 🚀 }
                      @case ('sending') { Transmitting... }
                      @case ('sent') { Message Sent! ✨ }
                      @case ('error') { Try Again }
                    }
                  </app-glow-button>
                </form>
              </div>
            </app-floating-card>
          </div>

          <!-- Contact Info -->
          <div class="space-y-6">
            <div appScrollReveal [revealDelay]="100">
              <app-floating-card>
                <div class="p-6">
                  <h3 class="font-display font-bold text-sm tracking-wider text-muted-foreground/60 mb-4 uppercase">
                    Reach Out
                  </h3>
                  <div class="space-y-4">
                    @for (item of contactInfo; track item.label) {
                      <a [href]="item.href" target="_blank" rel="noopener"
                         class="flex items-center gap-3 group">
                        <div class="w-10 h-10 rounded-xl glass flex items-center justify-center text-lg
                                    group-hover:scale-110 transition-transform duration-300">
                          {{ item.icon }}
                        </div>
                        <div>
                          <p class="text-xs text-muted-foreground/50">{{ item.label }}</p>
                          <p class="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {{ item.value }}
                          </p>
                        </div>
                      </a>
                    }
                  </div>
                </div>
              </app-floating-card>
            </div>

            <div appScrollReveal [revealDelay]="200">
              <app-floating-card>
                <div class="p-6">
                  <h3 class="font-display font-bold text-sm tracking-wider text-muted-foreground/60 mb-4 uppercase">
                    Location
                  </h3>
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl glass flex items-center justify-center text-lg">
                      📍
                    </div>
                    <div>
                      <p class="text-sm text-muted-foreground">Turkey 🇹🇷</p>
                      <p class="text-xs text-muted-foreground/50">UTC+3 · Available worldwide</p>
                    </div>
                  </div>
                </div>
              </app-floating-card>
            </div>

            <!-- CTA Card -->
            <div appScrollReveal [revealDelay]="300">
              <div class="glass rounded-2xl p-6 border border-[oklch(0.55_0.25_290/15%)]
                          text-center relative overflow-hidden">
                <div class="absolute inset-0 pointer-events-none">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                              w-40 h-40 rounded-full bg-[oklch(0.55_0.25_290/8%)] blur-[40px]"></div>
                </div>
                <div class="relative">
                  <p class="gradient-nebula-text font-display font-semibold text-sm mb-1">
                    Let's create something
                  </p>
                  <p class="font-display font-black text-xl gradient-nebula-text">
                    extraordinary ✦
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {
  private fb = new FormBuilder();

  contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  formStatus = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');

  contactInfo = [
    { icon: '📧', label: 'Email', value: 'hello@antigravity.dev', href: 'mailto:hello@antigravity.dev' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/hakan', href: 'https://github.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/hakan', href: 'https://linkedin.com' },
  ];

  onSubmit() {
    if (this.contactForm.invalid || this.formStatus() === 'sending') return;
    this.formStatus.set('sending');
    // Simulate API call
    setTimeout(() => {
      this.formStatus.set('sent');
      this.contactForm.reset();
      setTimeout(() => this.formStatus.set('idle'), 3000);
    }, 1500);
  }
}
