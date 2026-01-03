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


  async onPasteClick() {
    try {
      const text = await navigator.clipboard.readText()
      new URL(text) // Validate URL
      this.urlInput.set(text)
    } catch { }
  }

  onAddClick() {
    const url = this.urlInput()
    if (url.trim()) {
      this.addBookmark.emit(url)
      this.urlInput.set('')
    }
  }
}
