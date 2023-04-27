import { HttpClient } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TweetClient } from './tweet.client';

describe('TweetClientService', () => {
  const create = createServiceFactory({
    service: TweetClient,
    mocks: [HttpClient],
  });
  let spec: SpectatorService<TweetClient>;

  beforeEach(() => {
    spec = create();
  });

  describe('when getting all tweets...', () => {
    it('should make a GET request from the correct endpoint', () => {
      const getFn = spec.inject(HttpClient).get;
      spec.service.getAll();
      expect(getFn).toHaveBeenCalledWith(jasmine.stringContaining('tweets'));
    });
  });
});
