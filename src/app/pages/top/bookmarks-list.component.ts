import { Component, input, output } from '@angular/core'
import { CommonModule } from '@angular/common'

interface Bookmark {
  id: string
  url: string
  title: string
  createdAt: Date
}

@Component({
  selector: 'app-bookmarks-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmarks-list.component.html',
})
export class BookmarksListComponent {
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
