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
