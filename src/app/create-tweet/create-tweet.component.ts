import { Component } from '@angular/core';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent {
  tweet = '';

  onPostTweet(): void {
    console.log(this.buildTweet());
  }

  private buildTweet(): string {
    return `tweet: ${this.tweet}`;
  }
}
