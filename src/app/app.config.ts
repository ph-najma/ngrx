import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { UserEffects } from './store/user.effects';
import { userReducer } from './store/user.reducer';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ route: routerReducer }),
    provideState({
      name: 'user',
      reducer: userReducer,
    }),
    provideEffects(UserEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideRouterStore(),
    importProvidersFrom(MatNativeDateModule),
  ],
};
