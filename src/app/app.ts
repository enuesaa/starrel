import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './components/login-button.component';
import { LogoutButtonComponent } from './components/logout-button.component';
import { ProfileComponent } from './components/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginButtonComponent, LogoutButtonComponent, ProfileComponent],
  templateUrl: './app.html',
})
export class AppComponent {
  protected auth = inject(AuthService);
}
