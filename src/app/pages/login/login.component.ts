import { Component, inject } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected auth = inject(AuthService)
}
