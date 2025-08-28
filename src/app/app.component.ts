import { Component } from '@angular/core';
import { ChatService, ChatMessage } from './chat.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ Add CommonModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ Corrected from `styleUrl` to `styleUrls`
})

export class AppComponent {
    input = '';
    busy = false;
    history: ChatMessage[] = [
      { role: 'system', content: 'You are a helpful customer support assistant.' }
    ];
  
    constructor(private chat: ChatService) {}
  
    async send() {
      if (!this.input.trim() || this.busy) return;
      this.history.push({ role: 'user', content: this.input });
      const copy = [...this.history];
      this.input = '';
      this.busy = true;
  
      this.chat.send(copy).subscribe({
        next: (res) => {
          this.history.push({ role: 'assistant', content: res.output });
          this.busy = false;
        },
        error: (err) => {
          this.history.push({ role: 'assistant', content: `Error: ${err.message || err}` });
          this.busy = false;
        }
      });
    }
}
