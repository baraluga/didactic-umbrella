import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CreateTweetComponent } from './create-tweet.component';
import { CreateTweetModule } from './create-tweet.module';
import { TweetUtils } from './create-tweet.utils';
import { TweetManagerService } from '../services';

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

  it('should show an input for tweet', () => {
    expect(spec.query('input[data-test="tweet"]')).toBeTruthy();
  });

  it('should show the postTweet button', () => {
    expect(spec.query('button[data-test="postTweet"]')).toBeTruthy();
  });

  it('should delegate the adding of tweet to the relevant service', () => {
    // arrange
    const addTweet = spyOn(spec.inject(TweetManagerService), 'add');
    // act
    spec.typeInElement('something', '[data-test="tweet"]');
    spec.click('[data-test="postTweet"]');
    // assert
    expect(addTweet).toHaveBeenCalledWith(
      jasmine.stringContaining('something')
    );
  });
});
