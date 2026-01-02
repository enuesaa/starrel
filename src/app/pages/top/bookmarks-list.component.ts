import { Component, input, output, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { Bookmark } from '../../services/bookmark.service'

@Component({
  selector: 'app-bookmarks-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookmarks-list.component.html',
})
export class BookmarksListComponent {
  private router = inject(Router)

  bookmarks = input<Bookmark[]>([])
  deleteBookmark = output<string>()

  onDeleteClick(id: string) {
    this.deleteBookmark.emit(id)
  }

  getDomain(url: string): string {
    try {
      return new URL(url).hostname || url
    } catch {
      return url
    }
  }
}
