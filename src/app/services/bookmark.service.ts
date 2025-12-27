import { Injectable, signal } from '@angular/core'

export interface Bookmark {
  id: string
  url: string
  title: string
  createdAt: Date
}

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks = signal<Bookmark[]>([
    { id: '1', url: 'https://github.com', title: 'GitHub', createdAt: new Date() },
    { id: '2', url: 'https://stackoverflow.com', title: 'Stack Overflow', createdAt: new Date() },
    { id: '3', url: 'https://developer.mozilla.org', title: 'MDN Web Docs', createdAt: new Date() },
  ])

  addBookmark(url: string) {
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
      return bookmark
    } catch {
      throw new Error('Invalid URL')
    }
  }

  deleteBookmark(id: string) {
    this.bookmarks.update((current) => current.filter((b) => b.id !== id))
  }

  searchBookmarks(query: string): Bookmark[] {
    const lowerQuery = query.toLowerCase()
    return this.bookmarks().filter(
      (b) =>
        b.title.toLowerCase().includes(lowerQuery) ||
        b.url.toLowerCase().includes(lowerQuery),
    )
  }

  getBookmarksByDomain(domain: string): Bookmark[] {
    return this.bookmarks().filter((b) => {
      try {
        return new URL(b.url).hostname === domain
      } catch {
        return false
      }
    })
  }
}
