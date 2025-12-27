import { Routes } from '@angular/router'
import { Top } from './pages/top/top'
import { DomainListComponent } from './pages/domain-list/domain-list.component'
import { SearchComponent } from './pages/search/search.component'

export const routes: Routes = [
  { path: '', component: Top },
  { path: 'domain/:domain', component: DomainListComponent },
  { path: 'search', component: SearchComponent },
]
