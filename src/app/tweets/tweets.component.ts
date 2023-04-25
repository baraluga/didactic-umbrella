import { Component, OnInit } from '@angular/core';
import { TweetManagerService } from '../services';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
})
export class TweetsComponent implements OnInit {
  tweets: string[] = [];
  constructor(private readonly manager: TweetManagerService) {}

  ngOnInit(): void {
    this.tweets = this.manager.getTweets();
  }
}
