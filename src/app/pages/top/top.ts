import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

interface Bookmark {
  id: string
  url: string
  title: string
  createdAt: Date
}

@Component({
  selector: 'app-top',
  imports: [CommonModule, FormsModule],
  templateUrl: './top.html',
})
export class Top {
  protected readonly title = signal('Starrel')
  protected bookmarks = signal<Bookmark[]>([
    { id: '1', url: 'https://github.com', title: 'GitHub', createdAt: new Date() },
    { id: '2', url: 'https://stackoverflow.com', title: 'Stack Overflow', createdAt: new Date() },
    { id: '3', url: 'https://developer.mozilla.org', title: 'MDN Web Docs', createdAt: new Date() },
  ])
  protected urlInput = signal('')

  addBookmark() {
    const url = this.urlInput().trim()
    if (!url) return

    try {
      new URL(url)
      const title = new URL(url).hostname || url
      const bookmark: Bookmark = {
        id: Date.now().toString(),
        url,
        title,
        createdAt: new Date(),
      }
      this.bookmarks.update((current) => [bookmark, ...current])
      this.urlInput.set('')
    } catch {
      alert('Invalid URL')
    }
  }

  deleteBookmark(id: string) {
    this.bookmarks.update((current) => current.filter((b) => b.id !== id))
  }

  getDomain(url: string): string {
    try {
      return new URL(url).hostname || url
    } catch {
      return url
    }
  }
}
