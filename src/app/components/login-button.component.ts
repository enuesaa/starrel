import { Component, inject } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'

@Component({
  selector: 'app-login-button',
  standalone: true,
  templateUrl: './login-button.component.html',
})
export class LoginButtonComponent {
  private auth = inject(AuthService)

  loginWithRedirect(): void {
    this.auth.loginWithRedirect()
  }
}
