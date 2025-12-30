import { Routes } from '@angular/router'
import { Top } from './pages/top/top'
import { DomainListComponent } from './pages/domain-list/domain-list.component'
import { SearchComponent } from './pages/search/search.component'
import { LoginComponent } from './pages/login/login.component'
import { LogoutComponent } from './pages/logout/logout.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { authGuard } from './guards/auth.guard'

export const routes: Routes = [
  { path: '', component: Top, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'domain/:domain', component: DomainListComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
]
