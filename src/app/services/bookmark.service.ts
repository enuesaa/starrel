import { Injectable, signal, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '@auth0/auth0-angular'
import { map, switchMap, take } from 'rxjs'
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
  private auth = inject(AuthService)

  listBookmarks() {
    this.auth.getAccessTokenSilently().pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ body: { data: Bookmark[] } }>(this.apiUrl, {
          headers: { 'X-Authorization': `Bearer ${token}` },
        })
      }),
      map(res => res.body.data)
    ).subscribe({
      next: (data) => this.bookmarks.set(data),
      error: (err) => console.error('Failed to load bookmarks', err)
    });
  }

  addBookmark(url: string) {
    try {
      new URL(url)
      const body = { url }

      this.auth.getAccessTokenSilently().pipe(
        take(1),
        switchMap(token => {
          return this.http.post<{ success: boolean; data: Bookmark }>(this.apiUrl, body, {
            headers: { 'X-Authorization': `Bearer ${token}` },
          })
        })
      ).subscribe({
        next: () => {
          this.listBookmarks();
        },
        error: (err) => console.error('Failed to add bookmark', err)
      })
    } catch {
      throw new Error('Invalid URL')
    }
  }

  deleteBookmark(id: string) {
    this.auth.getAccessTokenSilently().pipe(
      take(1),
      switchMap(token => {
        return this.http.delete(`${this.apiUrl}/${id}`, {
          headers: { 'X-Authorization': `Bearer ${token}` },
        })
      })
    ).subscribe({
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
