import { Component } from '@angular/core';
import { TweetUtils } from './create-tweet.utils';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent {
  tweet = '';

  onPostTweet(): void {
    TweetUtils.alertTweet(this.buildTweet());
  }

  private buildTweet(): string {
    return `tweet: ${this.tweet}`;
  }
}
