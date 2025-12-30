import { Injectable, inject } from '@angular/core'
import { Router, CanActivateFn } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private auth = inject(AuthService)
  private router = inject(Router)

  canActivate: CanActivateFn = (route, state) => {
    return this.auth.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true
        } else {
          this.router.navigate(['/login'])
          return false
        }
      })
    )
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authGuardService = inject(AuthGuardService)
  return authGuardService.canActivate(route, state)
}
