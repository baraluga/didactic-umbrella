import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTweetComponent } from './create-tweet.component';

describe('CreateTweetComponent', () => {
  let component: CreateTweetComponent;
  let fixture: ComponentFixture<CreateTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTweetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show an input for tweet', () => {
    const compiled = TestBed.createComponent(CreateTweetComponent)
      .nativeElement as HTMLElement;
    const inputElement = compiled.querySelector('input[data-test="tweet"]');
    expect(inputElement).toBeTruthy();
  });

  it('should show the postTweet button', () => {
    const compiled = TestBed.createComponent(CreateTweetComponent)
      .nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector(
      'button[data-test="postTweet"]'
    );
    expect(buttonElement).toBeTruthy();
  });

  it('should log a string on click of powetTweet button', () => {
    const compiled = TestBed.createComponent(CreateTweetComponent)
      .nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector(
      'button[data-test="postTweet"]'
    ) as HTMLButtonElement;
    const logSpy = spyOn(console, 'log');
    buttonElement.click();
    expect(logSpy).toHaveBeenCalledWith(jasmine.stringContaining('tweet: '));
  });

  // it('should log the inputted tweet on click of postTweet button', () => {
  //   // arrange
  //   const compiled = TestBed.createComponent(CreateTweetComponent)
  //     .nativeElement as HTMLElement;
  //   const tweetInput = compiled.querySelector(
  //     'input[data-test="tweet"]'
  //   ) as HTMLInputElement;
  //   const INPUT_TWEET = 'hello achi';
  //   tweetInput.value = INPUT_TWEET;
  //   tweetInput.dispatchEvent(new Event('input'));
  //   const buttonElement = compiled.querySelector(
  //     'button[data-test="postTweet"]'
  //   ) as HTMLButtonElement;
  //   const logSpy = spyOn(console, 'log');
  //   // act
  //   buttonElement.click();
  //   // assert
  //   expect(logSpy).toHaveBeenCalledWith(INPUT_TWEET);
  // });
});
