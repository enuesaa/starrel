import { Component, inject, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule, ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BookmarkService, Bookmark } from '../../services/bookmark.service'
import { HeaderComponent } from '../../components/header/header.component'
import { filter, finalize, map, switchMap, tap } from 'rxjs'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private bookmarkService = inject(BookmarkService)

  searchQuery = ''

  // State signals
  searchResults = signal<Bookmark[]>([])
  isSearching = signal(false)
  hasSearched = signal(false)

  ngOnInit() {
    this.route.queryParams.pipe(
      filter(params => params['q']),
      tap(() => {
        this.isSearching.set(true)
        this.hasSearched.set(true)
        this.searchResults.set([])
      }),
      map(params => params['q']),
      switchMap(query => {
        this.searchQuery = query // Sync input
        return this.bookmarkService.searchBookmarks(query).pipe(
          finalize(() => this.isSearching.set(false))
        )
      })
    ).subscribe({
      next: (results) => {
        this.searchResults.set(results)
      },
      error: (err) => {
        console.error('Search failed', err)
        this.searchResults.set([])
      }
    })
  }

  performSearch() {
    if (!this.searchQuery.trim()) return
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.searchQuery },
    })
  }

  onSearchKeyup() {
    if (this.searchQuery.trim() === '') {
      this.searchResults.set([])
      this.hasSearched.set(false)
    }
  }

  goBack() {
    this.router.navigate(['/'])
  }

  getDomain(url: string): string {
    try {
      return new URL(url).hostname || url
    } catch {
      return url
    }
  }

  openBookmark(url: string) {
    window.open(url, '_blank')
  }

  goToDomain(domain: string) {
    this.router.navigate(['/search'], { queryParams: { q: domain } })
  }
}
