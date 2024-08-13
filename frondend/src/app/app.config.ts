import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { carritoReducer } from './ngrxcarrito/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),    provideAnimations(),
    provideToastr(),    provideStore(),
    provideState({name: 'cartState', reducer: carritoReducer}),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),],/// para las animaciones emergentes
};
