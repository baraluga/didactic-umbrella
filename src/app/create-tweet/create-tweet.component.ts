import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent {
  onPostTweet(): void {
    console.log('tweet: hello baby`');
  }
}
