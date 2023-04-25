import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CreateTweetComponent } from './create-tweet.component';
import { CreateTweetModule } from './create-tweet.module';
import { TweetUtils } from './create-tweet.utils';

describe('CreateTweetComponent (via Spectator)', () => {
  const create = createComponentFactory({
    component: CreateTweetComponent,
    imports: [CreateTweetModule],
    declareComponent: false,
  });
  let spectator: Spectator<CreateTweetComponent>;
  beforeEach(() => {
    spectator = create();
  });

  it('should be truthy', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show an input for tweet', () => {
    expect(spectator.query('input[data-test="tweet"]')).toBeTruthy();
  });

  it('should show the postTweet button', () => {
    expect(spectator.query('button[data-test="postTweet"]')).toBeTruthy();
  });

  it('should alert the inputted tweet on click of postTweet button', () => {
    const INPUT_TWEET = 'hello achi';
    spectator.typeInElement(INPUT_TWEET, 'input[data-test="tweet"]');
    const logSpy = spyOn(TweetUtils, 'alertTweet');
    spectator.click('button[data-test="postTweet"]');
    expect(logSpy).toHaveBeenCalledWith(jasmine.stringContaining(INPUT_TWEET));
  });
});
