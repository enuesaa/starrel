import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, of, startWith } from 'rxjs'

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
  private apiUrl = '/api/bookmarks'

  constructor(private http: HttpClient) { }

  listBookmarks() {
    // const token = localStorage.getItem('token');
    // if (!token) return;

    this.http
      .get<{ body: { data: Bookmark[] } }>(this.apiUrl, {
        // headers: { 'X-Authorization': `Bearer ${token}` },
      })
      .pipe(map(res => res.body.data))
      .subscribe({
        next: (data) => this.bookmarks.set(data),
        error: (err) => console.error('Failed to load bookmarks', err)
      });
  }

  addBookmark(url: string) {
    try {
      new URL(url)
      // const token = localStorage.getItem('token')
      // if (!token) throw new Error('Not authenticated')

      const body = { url }

      this.http
        .post<{ success: boolean; data: Bookmark }>(this.apiUrl, body, {
          // headers: { 'X-Authorization': `Bearer ${token}` },
        })
        .subscribe({
          next: () => {
            // Refresh list after add, or optimistically update. 
            // For simplicity/reliability with server logic (e.g. ID generation), we refresh.
            this.listBookmarks();
          },
          error: (err) => console.error('Failed to add bookmark', err)
        })
    } catch {
      throw new Error('Invalid URL')
    }
  }

  deleteBookmark(id: string) {
    // const token = localStorage.getItem('token')
    // if (!token) return

    this.http
      .delete(`${this.apiUrl}/${id}`, {
        // headers: { 'X-Authorization': `Bearer ${token}` },
      })
      .subscribe({
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
