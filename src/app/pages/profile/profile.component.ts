import { Component, inject } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  protected auth = inject(AuthService)
}
