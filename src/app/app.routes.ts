import { Routes } from '@angular/router'
import { About } from './about/about'
import { Top } from './top/top'

export const routes: Routes = [
  { path: '', component: Top },
  { path: 'about', component: About },
]
