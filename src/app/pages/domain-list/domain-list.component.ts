import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { BookmarkService, Bookmark } from '../../services/bookmark.service'

@Component({
  selector: 'app-domain-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './domain-list.component.html',
})
export class DomainListComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private bookmarkService = inject(BookmarkService)

  domain = ''
  bookmarks: Bookmark[] = []

  ngOnInit() {
    this.domain = this.route.snapshot.paramMap.get('domain') || ''
    this.loadBookmarksByDomain()
  }

  loadBookmarksByDomain() {
    this.bookmarks = this.bookmarkService.getBookmarksByDomain(this.domain)
  }

  goBack() {
    this.router.navigate(['/'])
  }

  openBookmark(url: string) {
    window.open(url, '_blank')
  }
}
