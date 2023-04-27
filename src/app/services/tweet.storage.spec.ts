import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TweetStorage } from './tweet.storage';

describe('TweetStorage', () => {
  const create = createServiceFactory({ service: TweetStorage });
  let spec: SpectatorService<TweetStorage>;

  beforeEach(() => {
    spec = create();
  });

  it('should be ok', () => {
    expect(spec).toBeTruthy();
  });
});
