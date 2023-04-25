import { Injectable } from '@angular/core';
import { Tweet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TweetManagerService {
  private readonly tweets: string[] = [];
  private readonly tweetsMap: Record<string, Tweet> = {};

  add(tweet: string): void {
    this.tweets.push(tweet);
  }

  getTweets(): string[] {
    return this.listTweets();
  }

  addTweet(tweetMessage: string): void {
    const tweet = this.buildTweet(tweetMessage);
    this.tweetsMap[tweet.id] = tweet;
  }

  private listTweets(): string[] {
    return Object.values(this.tweetsMap).map((tweet) => tweet.message);
  }

  private buildTweet(message: string): Tweet {
    return { id: this.generateId(), message };
  }

  private generateId(): string {
    return Math.random().toString();
  }
}
