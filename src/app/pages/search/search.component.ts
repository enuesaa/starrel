import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule, ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BookmarkService, Bookmark } from '../../services/bookmark.service'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
      this.searchResults = this.bookmarkService.searchBookmarks(this.searchQuery)
      this.hasSearched = true
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
    this.router.navigate(['/domain', domain])
  }
}
