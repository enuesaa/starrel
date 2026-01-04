import { Routes } from '@angular/router'
import { Top } from './pages/top/top'
import { SearchComponent } from './pages/search/search.component'
import { LoginComponent } from './pages/login/login.component'
import { authGuard } from './guards/auth.guard'
import { RecogComponent } from './pages/recog/recog.component'

export const routes: Routes = [
  { path: '', component: Top, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'recog', component: RecogComponent, canActivate: [authGuard] },
]
