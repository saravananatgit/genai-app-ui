import { Component } from '@angular/core';
import { ChatService, ChatMessage } from './chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
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