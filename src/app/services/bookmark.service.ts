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

  constructor(private http: HttpClient) {}

  listBookmarks(): Observable<Bookmark[]> {
    console.log('a')
    const token = localStorage.getItem('token');
    if (!token) return of([]);

    return this.http
      .get<{ body: { data: Bookmark[] } }>(this.apiUrl, {
        headers: { 'X-Authorization': `Bearer ${token}` },
      })
      .pipe(
        map(res => res.body.data)
      )
      .pipe(startWith([]));
  }

  addBookmark(url: string) {
    try {
      new URL(url)
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Not authenticated')

      const title = new URL(url).hostname || url
      const bookmark: Bookmark = {
        id: Date.now().toString(),
        url,
        title,
      }
      this.http
        .post<{ success: boolean }>(this.apiUrl, bookmark, {
          headers: { 'X-Authorization': `Bearer ${token}` },
        })
      return bookmark
    } catch {
      throw new Error('Invalid URL')
    }
  }

  deleteBookmark(id: string) {
    const token = localStorage.getItem('token')
    if (!token) return

    this.http
      .delete(`${this.apiUrl}/${id}`, {
        headers: { 'X-Authorization': `Bearer ${token}` },
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
