import { Component } from '@angular/core';
import { TweetManagerService } from '../services';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent {
  tweet = '';

  constructor(private readonly manager: TweetManagerService) {}

  onPostTweet(): void {
    this.manager.add(this.buildTweet());
  }

  private buildTweet(): string {
    return `tweet: ${this.tweet}`;
  }
}
