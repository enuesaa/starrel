import { Component, signal, ViewChild, ElementRef } from '@angular/core';
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

    <div class="mb-2 text-sm">
      <span *ngIf="isRecording()">● REC</span>
    </div>

    <textarea
      #area
      [value]="transcript() + interim()"
      rows="10"
      cols="100"
      readonly
      class="border border-gray-100 w-full"
    ></textarea>

    <section class="mt-2">
      <button
        (click)="startRecognition()"
        class="border border-gray-100 m-1 p-1 rounded cursor-pointer"
      >
        Start
      </button>
      <button
        (click)="stopRecognition()"
        class="border border-gray-100 m-1 p-1 rounded cursor-pointer"
      >
        Stop
      </button>
      <button
        (click)="clear()"
        class="border border-gray-100 m-1 p-1 rounded cursor-pointer"
      >
        Clear
      </button>
    </section>
  </main>
</div>
  `,
})
export class RecogComponent {
  @ViewChild('area') area!: ElementRef<HTMLTextAreaElement>;

  transcript = signal('');
  interim = signal('');
  isRecording = signal(false);
  isManuallyStopped = false;

  recognition: SpeechRecognition;

  constructor() {
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.lang = 'ja';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) {
          this.transcript.update(v => v + r[0].transcript + '\n');
        } else {
          interimText += r[0].transcript;
        }
      }

      this.interim.set(interimText);
      this.scrollToBottom();
    };

    this.recognition.onstart = () => {
      this.isRecording.set(true);
    };

    this.recognition.onend = () => {
      this.isRecording.set(false);
      this.interim.set('');

      // ★ Stop 押されてなければ自動再開
      if (!this.isManuallyStopped) {
        setTimeout(() => {
          try {
            this.recognition.start();
          } catch {}
        }, 300);
      }
    };
  }

  startRecognition() {
    this.isManuallyStopped = false;
    this.recognition.start();
  }

  stopRecognition() {
    this.isManuallyStopped = true;
    this.recognition.stop();
  }

  clear() {
    this.transcript.set('');
    this.interim.set('');
  }

  private scrollToBottom() {
    queueMicrotask(() => {
      if (this.area) {
        const el = this.area.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
