import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-speech-recognition',
  imports: [HeaderComponent],
  template: `
<div class="min-h-screen">
  <app-header [showBackButton]="true"></app-header>

  <main class="max-w-4xl mx-auto px-6 py-10">
    <h2>文字起こし</h2>

    <textarea
      [value]="transcript()"
      rows="10"
      cols="100"
      readonly
      class="border border-gray-100"
    ></textarea>

    <section>
      <button (click)="startRecognition()" class="border border-gray-100 m-1 p-1 rounded cursor-pointer">Start</button>
      <button (click)="stopRecognition()" class="border border-gray-100 m-1 p-1 rounded cursor-pointer">Stop</button>
    </section>
  </main>
</div>
  `,
})
export class RecogComponent {
  transcript = signal('')
  recognition: SpeechRecognition;

  constructor() {
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.lang = 'ja';
    this.recognition.continuous = true;

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results[event.results.length - 1];
      this.transcript.update(v => v + last[0].transcript);
    };
  }

  startRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
  }
}
