import { Component } from '@angular/core';
import { Tweet } from '../models';
import { TweetManagerService } from '../services';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
})
export class TweetsComponent {
  get tweets(): Tweet[] {
    return this.manager.getListOfTweets();
  }

  constructor(private readonly manager: TweetManagerService) {}
}
