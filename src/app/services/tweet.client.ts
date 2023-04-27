import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Tweet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TweetClient {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.buildTweetsEndpoint());
  }

  create(message: string): Observable<Tweet> {
    return this.http.post<Tweet>(
      this.buildTweetsEndpoint(),
      this.buildTweet(message)
    );
  }

  private buildTweet(message: string): Tweet {
    return { message, id: Math.random().toString() };
  }

  private buildTweetsEndpoint(): string {
    return `${this.buildBaseUrl()}/tweets`;
  }

  private buildBaseUrl(): string {
    return 'http://localhost:3000';
  }
}
