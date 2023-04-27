import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Tweet, Tweets } from '../models';
import { PERSISTENCE_CLIENT, PersistenceClient } from './tweet.tokens';

@Injectable({
  providedIn: 'root',
})
export class TweetManagerService {
  private readonly tweetsState = new BehaviorSubject<Tweets>({});
  readonly tweets$: Observable<Tweet[]> = this.getTweetsAsObservable();

  constructor(
    @Inject(PERSISTENCE_CLIENT) private readonly client: PersistenceClient
  ) {
    this.subscribeToTweetsClientForInitialization();
  }

  add(tweet: string): void {
    this.addTweet(tweet);
  }

  addTweet(tweetMessage: string): void {
    this.client
      .create(tweetMessage)
      .pipe(take(1))
      .subscribe((tweet) => this.insertToTweets(tweet));
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

  private subscribeToTweetsClientForInitialization(): void {
    this.client
      .getAll()
      .pipe(
        map((tweets) => this.reduceTweetsUsingId(tweets)),
        take(1)
      )
      .subscribe((tweets: Tweets) => {
        this.tweetsState.next(tweets);
      });
  }

  private reduceTweetsUsingId(tweet: Tweet[]): Tweets {
    return tweet.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {} as Tweets);
  }

  private getTweetsAsObservable(): Observable<Tweet[]> {
    return this.tweetsState.pipe(map((tweets) => Object.values(tweets)));
  }

  private removeFromTweets(id: string): void {
    const current = this.tweetsState.value;
    delete current[id];
    this.tweetsState.next(current);
  }

  private insertToTweets(tweet: Tweet): void {
    this.tweetsState.next({
      ...this.tweetsState.value,
      [tweet.id]: tweet,
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
