import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Tweet } from '../models';
import { TweetStorage } from './tweet.storage';

describe('TweetStorage', () => {
  const create = createServiceFactory({ service: TweetStorage });
  let spec: SpectatorService<TweetStorage>;

  beforeEach(() => {
    spec = create();
  });

  describe('when retrieving all tweets from storage...', () => {
    it("should successfully do so if there's existing data", (done) => {
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify([{ id: '123', message: 'hello' } as Tweet])
      );
      spec.service.getAll().subscribe((tweets) => {
        expect(tweets).toEqual([{ id: '123', message: 'hello' }]);
        done();
      });
    });

    it("should gracefully handle if there's no existing data", (done) => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spec.service.getAll().subscribe((tweets) => {
        expect(tweets).toEqual([]);
        done();
      });
    });
  });
});
