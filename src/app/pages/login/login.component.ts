import { Component } from '@angular/core'
import { LoginButtonComponent } from '../../components/login-button.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
