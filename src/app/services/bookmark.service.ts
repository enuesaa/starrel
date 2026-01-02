import { Injectable, signal, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs'
import { environment } from '../../environments/environment'

export interface Bookmark {
  id: string
  url: string
  title: string
  createdAt?: Date
}

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks = signal<Bookmark[]>([])
  private apiUrl = `${environment.apiBaseUrl}/bookmarks`
  private http = inject(HttpClient)

  listBookmarks() {
    this.http.get<{ items: Bookmark[] }>(this.apiUrl).pipe(
      map(res => res.items)
    ).subscribe({
      next: (data) => this.bookmarks.set(data),
      error: (err) => console.error('Failed to load bookmarks', err)
    });
  }

  addBookmark(url: string) {
    const body = { url }
    this.http.post<{ success: boolean; data: Bookmark }>(this.apiUrl, body).subscribe({
      next: () => {
        this.listBookmarks()
      },
      error: (err) => console.error('Failed to add bookmark', err),
    })
  }

  deleteBookmark(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.listBookmarks();
      },
      error: (err) => console.error('Failed to delete bookmark', err)
    })
  }

  searchBookmarks(query: string): Bookmark[] {
    const lowerQuery = query.toLowerCase()
    return this.bookmarks().filter(
      (b) => b.title.toLowerCase().includes(lowerQuery) || b.url.toLowerCase().includes(lowerQuery)
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
