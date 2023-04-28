import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TweetManagerService } from '../services';
import { TweetsResolver } from './tweets.resolver';

describe('TweetsResolver', () => {
  const create = createServiceFactory({ service: TweetsResolver });
  let spec: SpectatorService<TweetsResolver>;

  beforeEach(() => {
    spec = create();
  });

  it('should request for the tweets on resolve', () => {
    const fetchTweets = spyOn(spec.inject(TweetManagerService), 'fetchTweets');
    spec.service.resolve();
    expect(fetchTweets).toHaveBeenCalled();
  });
});
