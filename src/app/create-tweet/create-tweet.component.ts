import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
    message: new FormControl('', Validators.maxLength(10)),
    handle: new FormControl('', this.onlySpecificHandle('dale')),
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

  private onlySpecificHandle(handle: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === handle ? null : { invalidHandle: true };
    };
  }
}
