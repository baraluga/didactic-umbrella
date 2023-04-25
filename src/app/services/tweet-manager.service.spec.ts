import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TweetManagerService } from './tweet-manager.service';

describe('TweetManagerService', () => {
  const create = createServiceFactory({ service: TweetManagerService });
  let spec: SpectatorService<TweetManagerService>;

  beforeEach(() => {
    spec = create();
  });

  it('should provide a way to add tweets', () => {
    spec.service.add('Hello World!');
    expect(spec.service.getTweets()).toContain('Hello World!');
  });
});
