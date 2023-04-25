import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TweetManagerService } from './tweet-manager.service';

describe('TweetManagerService', () => {
  const create = createServiceFactory({ service: TweetManagerService });
  let spec: SpectatorService<TweetManagerService>;

  beforeEach(() => {
    spec = create();
  });

  it('should be ok', () => {
    expect(spec).toBeTruthy();
  });
});
