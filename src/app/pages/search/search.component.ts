import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule, ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BookmarkService, Bookmark } from '../../services/bookmark.service'
import { HeaderComponent } from '../../components/header/header.component'

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
  searchResults: Bookmark[] = []
  hasSearched = false

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['q']) {
        this.searchQuery = params['q']
        this.performSearch()
      }
    })
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.bookmarkService.searchBookmarks(this.searchQuery).subscribe({
        next: (results) => {
          this.searchResults = results
          this.hasSearched = true
        },
        error: (err) => console.error('Search failed', err),
      })

      // Update URL with query parameter
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: this.searchQuery },
      })
    }
  }

  onSearchKeyup() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = []
      this.hasSearched = false
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
