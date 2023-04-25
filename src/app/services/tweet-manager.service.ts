import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TweetManagerService {
  private readonly tweets: string[] = [];

  add(tweet: string): void {
    this.tweets.push(tweet);
  }

  getTweets(): string[] {
    return this.tweets;
  }
}
