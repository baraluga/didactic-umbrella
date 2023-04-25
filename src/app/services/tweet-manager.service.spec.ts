import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TweetManagerService } from './tweet-manager.service';

describe('TweetManagerService', () => {
  const create = createServiceFactory({ service: TweetManagerService });
  let spec: SpectatorService<TweetManagerService>;

  beforeEach(() => {
    spec = create();
    spec.service.addTweet('hello');
  });

  it('should provide a way to add tweet by specifying the message', () => {
    spec.service.addTweet('mom!');
    expect(spec.service.getTweets()).toContain('mom!');
  });

  it('should provide a way to list the running tweets', () => {
    spec.service.add('dad!');
    expect(spec.service.getListOfTweets()).toContain(
      jasmine.objectContaining({
        id: jasmine.any(String),
        message: 'dad!',
      })
    );
  });
});
