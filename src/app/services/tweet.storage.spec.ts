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

  it('should put the to-be-created tweet with the given message', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([{ id: '123', message: 'hello' } as Tweet])
    );
    const setItem = spyOn(localStorage, 'setItem');
    const stringify = spyOn(JSON, 'stringify').and.callThrough();
    spec.service.create('another message');
    expect(stringify).toHaveBeenCalledWith([
      jasmine.objectContaining({
        id: '123',
      }),
      jasmine.objectContaining({
        message: 'another message',
      }),
    ]);
    expect(setItem).toHaveBeenCalledWith(
      'tweets',
      jasmine.stringContaining('another message')
    );
  });
});
