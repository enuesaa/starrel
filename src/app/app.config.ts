import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter, withHashLocation } from '@angular/router'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideAuth0 } from '@auth0/auth0-angular'
import { environment } from '../environments/environment'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withFetch(),
    ),
    provideAuth0({
      domain: environment.authDomain,
      clientId: environment.authClientId,
      authorizationParams: {
        redirect_uri: window.location.href,
        audience: environment.authAudience,
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    }),
  ],
}
