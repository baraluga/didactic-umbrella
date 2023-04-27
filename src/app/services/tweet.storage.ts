import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tweet } from '../models';
import { PersistenceClient } from './tweet.tokens';

@Injectable({
  providedIn: 'root',
})
export class TweetStorage implements PersistenceClient {
  constructor() {
    localStorage.getItem('');
  }
  getAll(): Observable<Tweet[]> {
    return of(this.getTweetsFromStorage());
  }
  create(message: string): Observable<Tweet> {
    const newTweet = { id: this.generateId(), message };
    localStorage.setItem(
      'tweets',
      JSON.stringify([...this.getTweetsFromStorage(), newTweet])
    );
    return of(newTweet);
  }

  private generateId(): string {
    return Math.random().toString();
  }

  private getTweetsFromStorage(): Tweet[] {
    return JSON.parse(localStorage.getItem('tweets') || '[]');
  }
}
