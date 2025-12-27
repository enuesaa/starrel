import { Component, signal, output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-add-bookmark',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-bookmark.component.html',
})
export class AddBookmarkComponent {
  urlInput = signal('')
  addBookmark = output<string>()

  onAddClick() {
    const url = this.urlInput()
    if (url.trim()) {
      this.addBookmark.emit(url)
      this.urlInput.set('')
    }
  }
}
