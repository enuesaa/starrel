import { Component, inject, OnInit } from '@angular/core'
import { NgIf } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AddBookmarkComponent } from './add-bookmark.component'
import { BookmarksListComponent } from './bookmarks-list.component'
import { BookmarkService } from '../../services/bookmark.service'
import { HeaderComponent } from '../../components/header/header.component'

@Component({
  selector: 'app-top',
  imports: [NgIf, RouterModule, AddBookmarkComponent, BookmarksListComponent, HeaderComponent],
  templateUrl: './top.html',
})
export class Top implements OnInit {
  private bookmarkService = inject(BookmarkService)
  bookmarks = this.bookmarkService.bookmarks
  isLoading = this.bookmarkService.isLoading

  ngOnInit() {
    this.bookmarkService.loadBookmarks()
  }

  onAddBookmarkClick(url: string) {
    this.bookmarkService.addBookmark(url)
  }

  deleteBookmark(id: string) {
    this.bookmarkService.deleteBookmark(id)
  }
}
