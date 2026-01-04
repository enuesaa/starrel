import { Component, Input, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() showSearchButton = false
  @Input() showBackButton = false
  @Input() showUserProfile = false
  @Input() showLogoutButton = false

  private router = inject(Router)
  protected auth = inject(AuthService)
  isUserMenuOpen = false

  goToSearch() {
    this.router.navigate(['/search'])
  }
  
  goToRecog() {
    this.router.navigate(['/recog'])
  }

  goBack() {
    this.router.navigate(['/'])
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen
  }

  closeUserMenu() {
    this.isUserMenuOpen = false
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }
}
