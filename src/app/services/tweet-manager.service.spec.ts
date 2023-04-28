import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { of } from 'rxjs';
import { Tweet } from '../models';
import { TweetManagerService } from './tweet-manager.service';
import { PERSISTENCE_CLIENT, PersistenceClient } from './tweet.tokens';

const mockClient = () =>
  ({
    getAll: () => of([{ id: 'id1', message: 'message1' }]),
    create: (message: string) => of({ id: '', message } as Tweet),
  } as unknown as PersistenceClient);

describe('TweetManagerService', () => {
  const TEST_MESSAGE = 'hello';
  const create = createServiceFactory({
    service: TweetManagerService,
    providers: [{ provide: PERSISTENCE_CLIENT, useValue: mockClient() }],
  });
  let spec: SpectatorService<TweetManagerService>;

  beforeEach(() => {
    spec = create();
    spec.service.addTweet(TEST_MESSAGE);
  });

  describe('when creating a new tweet...', () => {
    it('should delegate the creation of a new tweet to the client', () => {
      const createFn = spyOn(
        spec.inject(PERSISTENCE_CLIENT),
        'create'
      ).and.callThrough();
      spec.service.addTweet('bombo!');
      expect(createFn).toHaveBeenCalledWith('bombo!');
    });

    it('should insert the newly created tweet on succesful request of client', () => {
      spyOn(spec.inject(PERSISTENCE_CLIENT), 'create').and.returnValue(
        of({ id: '123' } as Tweet)
      );
      spec.service.addTweet('123');
      expect(spec.service.getListOfTweets()).toContain(
        jasmine.objectContaining({
          id: '123',
        })
      );
    });
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

  it('should provide the stream of tweets', (done) => {
    spec.service.tweets$.subscribe((tweets) => {
      expect(tweets).toContain(
        jasmine.objectContaining({
          message: TEST_MESSAGE,
        })
      );
    });
    done();
  });

  it('should provide a way to remove a tweet with the matching ID', () => {
    const tweets = spec.service.getListOfTweets();
    expect(tweets.length).toBeGreaterThan(0);
    const testId = tweets.find((tweet) => tweet.message === TEST_MESSAGE)?.id;
    spec.service.delete(testId as string);
    expect(spec.service.getListOfTweets()).not.toContain(
      jasmine.objectContaining({
        message: TEST_MESSAGE,
      })
    );
  });

  describe('when fetching for all tweets...', () => {
    it('should delegate the actual fetching to client', () => {
      const getAllFn = spyOn(
        spec.inject(PERSISTENCE_CLIENT),
        'getAll'
      ).and.returnValue(of());
      spec.service.fetchTweets();
      expect(getAllFn).toHaveBeenCalled();
    });

    it('should insert the existing tweets from the client to the state', () => {
      spyOn(spec.inject(PERSISTENCE_CLIENT), 'getAll').and.returnValue(
        of([{ id: 'id1', message: 'message1' }])
      );
      spec.service.fetchTweets().subscribe();
      expect(spec.service.getListOfTweets()).toEqual([
        jasmine.objectContaining({
          id: 'id1',
        }),
      ]);
    });
  });
});
