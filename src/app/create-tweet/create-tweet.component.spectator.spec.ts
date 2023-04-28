import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TweetManagerService } from '../services';
import { CreateTweetComponent } from './create-tweet.component';
import { CreateTweetModule } from './create-tweet.module';

describe('CreateTweetComponent (via Spectator)', () => {
  const create = createComponentFactory({
    component: CreateTweetComponent,
    imports: [CreateTweetModule],
    declareComponent: false,
  });
  let spec: Spectator<CreateTweetComponent>;
  beforeEach(() => {
    spec = create();
  });

  it('should be truthy', () => {
    expect(spec.component).toBeTruthy();
  });

  it('should keep track of the inputted handle', () => {
    spec.typeInElement('baraluga', '[data-test="handle"]');
    expect(spec.component.getCurrentHandle()).toEqual('baraluga');
  });

  it('should keep track of the inputted tweet', () => {
    spec.typeInElement('something', '[data-test="tweet"]');
    expect(spec.component.getCurrentTweet()).toEqual('something');
  });

  it('should show an input for tweet', () => {
    expect(spec.query('input[data-test="tweet"]')).toBeTruthy();
  });

  it('should show the postTweet button', () => {
    expect(spec.query('button[data-test="postTweet"]')).toBeTruthy();
  });

  describe('when attempting to post a tweet...', () => {
    it('should enable the postTweet button if both message and handle are valid', () => {
      const addFn = spyOn(spec.inject(TweetManagerService), 'add');
      spec.typeInElement('something', '[data-test="tweet"]');
      spec.typeInElement('dale', '[data-test="handle"]');
      spec.click('[data-test="postTweet"]');
      expect(addFn).toHaveBeenCalledWith(jasmine.stringContaining('something'));
    });

    it('should disable the post button if message is invalid even if handle is valid', () => {
      spec.typeInElement(
        'something is gone from the world',
        '[data-test="tweet"]'
      );
      spec.typeInElement('dale', '[data-test="handle"]');
      expect(spec.query('button[data-test="postTweet"]')).toBeDisabled();
    });

    it('should disable the post if handle is invalid even if message is valid', () => {
      spec.typeInElement('something', '[data-test="tweet"]');
      spec.typeInElement('baraluga', '[data-test="handle"]');
      expect(spec.query('button[data-test="postTweet"]')).toBeDisabled();
    });
  });
});
