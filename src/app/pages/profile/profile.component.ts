import { Component, inject } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from '../../components/header/header.component'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  protected auth = inject(AuthService)
}
