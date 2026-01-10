import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withFetch, withInterceptors, HttpInterceptorFn } from '@angular/common/http'
import { provideAuth0, AuthService } from '@auth0/auth0-angular'
import { environment } from '../environments/environment'
import { inject } from '@angular/core'
import { catchError, switchMap, throwError } from 'rxjs'

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
      }),
      catchError(err => {
        auth.logout({ logoutParams: { returnTo: window.location.origin } })
        return throwError(() => err)
      })
    )
  }

  return next(req)
}

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAuth0({
      domain: environment.authDomain,
      clientId: environment.authClientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.authAudience,
        scope: 'openid profile email offline_access',
      },
      cacheLocation: 'memory',
      useRefreshTokens: true,
    }),
  ],
}
