import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TweetManagerService } from '../services';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent {
  readonly tweetControl: FormControl = new FormControl('');
  readonly handleControl: FormControl = new FormControl('');

  readonly tweetForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    handle: new FormControl('', Validators.required),
  });

  constructor(private readonly manager: TweetManagerService) {}

  onPostTweet(): void {
    this.manager.add(this.buildTweet());
  }

  getCurrentHandle(): string {
    return this.tweetForm.getRawValue().handle;
  }

  getCurrentTweet(): string {
    return this.tweetForm.getRawValue().message;
  }

  private buildTweet(): string {
    return `tweet: ${this.getCurrentTweet()}`;
  }
}
