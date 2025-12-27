import { Routes } from '@angular/router'
import { Top } from './pages/top/top'
import { BookmarkDetailComponent } from './pages/bookmark-detail/bookmark-detail.component'

export const routes: Routes = [
  { path: '', component: Top },
  { path: 'bookmark/:id', component: BookmarkDetailComponent },
]
