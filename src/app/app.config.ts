import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideZard } from '@/shared/core/provider/providezard';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideZard(),
    {
      provide: 'FIREBASE_APP',
      useFactory: () => {
        const app = initializeApp(firebaseConfig);
        if (typeof window !== 'undefined') {
          getAnalytics(app);
        }
        return app;
      }
    }
  ]
};
