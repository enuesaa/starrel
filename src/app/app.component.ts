import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected auth = inject(AuthService)
}
