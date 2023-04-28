import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs';
import { TweetManagerService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class TweetsResolver implements Resolve<void> {
  constructor(private readonly manager: TweetManagerService) {}

  resolve(): void {
    this.manager.fetchTweets().pipe(take(1)).subscribe();
  }
}
