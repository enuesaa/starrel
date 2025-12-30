import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { AddBookmarkComponent } from './add-bookmark.component'
import { BookmarksListComponent } from './bookmarks-list.component'
import { BookmarkService } from '../../services/bookmark.service'
import { HeaderComponent } from '../../components/header/header.component'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-top',
  imports: [CommonModule, RouterModule, AddBookmarkComponent, BookmarksListComponent, HeaderComponent],
  templateUrl: './top.html',
})
export class Top {
  private router = inject(Router)
  protected bookmarkService = inject(BookmarkService)

  protected readonly title = environment.appName
  protected readonly environment = environment

  get bookmarks() {
    return this.bookmarkService.bookmarks
  }

  onAddBookmarkClick(url: string) {
    try {
      this.bookmarkService.addBookmark(url)
    } catch (error) {
      alert('Invalid URL')
    }
  }

  deleteBookmark(id: string) {
    this.bookmarkService.deleteBookmark(id)
  }
}
