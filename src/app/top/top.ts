import { Component, signal } from '@angular/core'

@Component({
  imports: [],
  templateUrl: './top.html',
})
export class Top {
  protected readonly title = signal('starrel')
  protected readonly message = signal('hello')
}
