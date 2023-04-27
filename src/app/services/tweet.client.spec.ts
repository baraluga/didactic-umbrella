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

  it('should make a GET request from the correct endpoint when getting all tweets', () => {
    const getFn = spec.inject(HttpClient).get;
    spec.service.getAll();
    expect(getFn).toHaveBeenCalledWith(jasmine.stringContaining('tweets'));
  });

  describe('when adding a new tweet...', () => {
    it('should make a POST request to the corerct endpoint', () => {
      const postFn = spec.inject(HttpClient).post;
      spec.service.create('hello!');
      expect(postFn).toHaveBeenCalledWith(
        jasmine.stringContaining('tweets'),
        jasmine.anything()
      );
    });

    it('should make a POST request with the message as payload', () => {
      const postFn = spec.inject(HttpClient).post;
      spec.service.create('hello!');
      expect(postFn).toHaveBeenCalledWith(
        jasmine.any(String),
        jasmine.objectContaining({
          message: 'hello!',
          id: jasmine.any(String),
        })
      );
    });
  });
});
