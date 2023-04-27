import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TweetClient {
  constructor(private readonly http: HttpClient) {}

  getAll(): void {
    this.http.get(this.buildTweetsEndpoint());
  }

  private buildTweetsEndpoint(): string {
    return `${this.buildBaseUrl()}/tweets`;
  }

  private buildBaseUrl(): string {
    return 'http://localhost:3000';
  }
}
