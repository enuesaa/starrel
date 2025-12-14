import { Routes } from '@angular/router'
import { About } from './pages/about/about'
import { Top } from './pages/top/top'

export const routes: Routes = [
  { path: '', component: Top },
  { path: 'about', component: About },
]
