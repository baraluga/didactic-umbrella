import { Injectable } from '@angular/core';
import { Tweet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TweetManagerService {
  private readonly tweetsMap: Record<string, Tweet> = {};

  add(tweet: string): void {
    this.addTweet(tweet);
  }

  addTweet(tweetMessage: string): void {
    const tweet = this.buildTweet(tweetMessage);
    this.tweetsMap[tweet.id] = tweet;
  }

  getTweets(): string[] {
    return this.listTweets();
  }

  getListOfTweets(): Tweet[] {
    return Object.values(this.tweetsMap);
  }

  private listTweets(): string[] {
    return this.getListOfTweets().map((tweet) => tweet.message);
  }

  private buildTweet(message: string): Tweet {
    return { id: this.generateId(), message };
  }

  private generateId(): string {
    return Math.random().toString();
  }
}
