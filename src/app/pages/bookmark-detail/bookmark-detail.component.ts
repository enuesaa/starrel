import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { HeaderComponent } from '../../components/header/header.component'

@Component({
  selector: 'app-bookmark-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './bookmark-detail.component.html',
})
export class BookmarkDetailComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  bookmarkId = ''
  bookmarkUrl = ''

  ngOnInit() {
    this.bookmarkId = this.route.snapshot.paramMap.get('id') || ''
    // In a real app, you would fetch the bookmark from a service
    // For now, we'll use the ID as a placeholder
    this.bookmarkUrl = `https://example.com/${this.bookmarkId}`
  }

  openBookmark() {
    window.open(this.bookmarkUrl, '_blank')
  }
}
