import { Injectable } from '@angular/core';import { HttpClient } from '@angular/common/http';import { environment } from '../environments/environment';import { Observable } from 'rxjs';
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
export interface ChatRequest {
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
}
export interface ChatResponse {
  output: string;
  usage?: any;
}
@Injectable({ providedIn: 'root' })export class ChatService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  send(messages: ChatMessage[], max_tokens = 512, temperature = 0.2): Observable<ChatResponse> {
    const body: ChatRequest = { messages, max_tokens, temperature };
    return this.http.post<ChatResponse>(`${this.base}/chat`, body);
  }
}