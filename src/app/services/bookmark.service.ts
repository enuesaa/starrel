import { Injectable, signal, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, finalize } from 'rxjs'
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
  isLoading = signal(false)
  private apiUrl = `${environment.apiBaseUrl}/bookmarks`
  private http = inject(HttpClient)

  constructor() {
    this.loadBookmarks()
  }

  loadBookmarks() {
    this.isLoading.set(true)
    this.http
      .get<{ items: Bookmark[] }>(this.apiUrl)
      .pipe(
        map((res) => res.items),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (data) => this.bookmarks.set(data),
        error: (err) => console.error('Failed to load bookmarks', err),
      })
  }

  addBookmark(url: string) {
    const body = { url }
    this.http.post<{ success: boolean; data: Bookmark }>(this.apiUrl, body).subscribe({
      next: () => {
        this.loadBookmarks()
      },
      error: (err) => console.error('Failed to add bookmark', err),
    })
  }

  deleteBookmark(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.loadBookmarks()
      },
      error: (err) => console.error('Failed to delete bookmark', err),
    })
  }

  searchBookmarks(query: string) {
    return this.http
      .get<{ items: Bookmark[] }>(this.apiUrl, {
        params: { keyword: query },
      })
      .pipe(map((res) => res.items))
  }
}
