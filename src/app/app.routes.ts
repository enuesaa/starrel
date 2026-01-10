import { Routes } from '@angular/router'
import { Top } from './pages/top/top'
import { SearchComponent } from './pages/search/search.component'
import { LoginComponent } from './pages/login/login.component'
import { RecogComponent } from './pages/recog/recog.component'
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: Top, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'recog', component: RecogComponent, canActivate: [AuthGuard] },
]
