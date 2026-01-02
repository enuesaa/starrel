import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgIf } from '@angular/common'
import { AddBookmarkComponent } from './add-bookmark.component'
import { BookmarksListComponent } from './bookmarks-list.component'
import { BookmarkService } from '../../services/bookmark.service'
import { HeaderComponent } from '../../components/header/header.component'

@Component({
  selector: 'app-top',
  imports: [NgIf, RouterModule, AddBookmarkComponent, BookmarksListComponent, HeaderComponent],
  templateUrl: './top.html',
})
export class Top {
  private bookmarkService = inject(BookmarkService)
  bookmarks = this.bookmarkService.bookmarks
  isLoading = this.bookmarkService.isLoading


  onAddBookmarkClick(url: string) {
    this.bookmarkService.addBookmark(url)
  }

  deleteBookmark(id: string) {
    this.bookmarkService.deleteBookmark(id)
  }
}
