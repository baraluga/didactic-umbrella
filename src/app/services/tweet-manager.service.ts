import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Tweet, Tweets } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TweetManagerService {
  private readonly tweetsState = new BehaviorSubject<Tweets>({});
  readonly tweets$: Observable<Tweet[]> = this.getTweetsAsObservable();

  add(tweet: string): void {
    this.addTweet(tweet);
  }

  addTweet(tweetMessage: string): void {
    this.addToTweets(tweetMessage);
  }

  getTweets(): string[] {
    return this.listTweets();
  }

  getListOfTweets(): Tweet[] {
    return Object.values(this.tweetsState.value);
  }

  delete(id: string): void {
    this.removeFromTweets(id);
  }

  private getTweetsAsObservable(): Observable<Tweet[]> {
    return this.tweetsState.pipe(map((tweets) => Object.values(tweets)));
  }

  private removeFromTweets(id: string): void {
    const current = this.tweetsState.value;
    delete current[id];
    this.tweetsState.next(current);
  }

  private addToTweets(message: string): void {
    const builtTweet = this.buildTweet(message);
    this.tweetsState.next({
      ...this.tweetsState.value,
      [builtTweet.id]: builtTweet,
    });
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
