import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter, withHashLocation } from '@angular/router'
import { provideHttpClient, withFetch, withInterceptors, HttpInterceptorFn } from '@angular/common/http'
import { provideAuth0, AuthService } from '@auth0/auth0-angular'
import { environment } from '../environments/environment'
import { inject } from '@angular/core'
import { switchMap } from 'rxjs'

const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService)
  if (req.url.startsWith(environment.apiBaseUrl)) {
    return auth.getAccessTokenSilently().pipe(
      switchMap((token) => {
        const authReq = req.clone({
          setHeaders: {
            'X-Authorization': `Bearer ${token}`,
          },
        })
        return next(authReq)
      })
    )
  }

  return next(req)
}

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]),
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
