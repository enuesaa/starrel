import { Component, signal } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly title = signal('dashboard')
}
