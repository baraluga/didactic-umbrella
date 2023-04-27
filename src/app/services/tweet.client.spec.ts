import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TweetClient } from './tweet.client';

describe('TweetClientService', () => {
  const create = createServiceFactory({ service: TweetClient });
  let spec: SpectatorService<TweetClient>;

  beforeEach(() => {
    spec = create();
  });

  it('should be ok', () => {
    expect(spec).toBeTruthy();
  });
});
