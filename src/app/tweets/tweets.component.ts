import { Component } from '@angular/core';
import { Tweet } from '../models';
import { TweetManagerService } from '../services';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
  providers: [],
})
export class TweetsComponent {
  get tweets(): Tweet[] {
    return this.manager.getListOfTweets();
  }

  readonly tweets$ = this.manager.tweets$;

  constructor(private readonly manager: TweetManagerService) {}

  onRemoveTweet(id: string): void {
    this.manager.delete(id);
  }
}
