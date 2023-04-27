import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator';
import { TweetManagerService } from './tweet-manager.service';
import { TweetClient } from './tweet.client';
import { of, take } from 'rxjs';
import { Tweet } from '../models';

const mockClient = () =>
  ({
    getAll: () => of([{ id: 'id1', message: 'message1' }]),
  } as unknown as TweetClient);

describe('TweetManagerService', () => {
  const TEST_MESSAGE = 'hello';
  const create = createServiceFactory({
    service: TweetManagerService,
    providers: [mockProvider(TweetClient, mockClient())],
  });
  let spec: SpectatorService<TweetManagerService>;

  beforeEach(() => {
    spec = create();
    spec
      .inject(TweetClient)
      .create.and.callFake((message: string) =>
        of({ id: '', message } as Tweet)
      );
    spec.service.addTweet(TEST_MESSAGE);
  });

  describe('when creating a new tweet...', () => {
    it('should delegate the creation of a new tweet to the client', () => {
      const createFn = spec.inject(TweetClient).create;
      spec.service.addTweet('bombo!');
      expect(createFn).toHaveBeenCalledWith('bombo!');
    });

    it('should insert the newly created tweet on succesful request of client', () => {
      spec
        .inject(TweetClient)
        .create.and.returnValue(of({ id: '123' } as Tweet));
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

  it('should initialize the state with the data from TweetClient', (done) => {
    spec.service.tweets$.pipe(take(1)).subscribe((tweets) => {
      expect(tweets).toContain(
        jasmine.objectContaining({
          id: 'id1',
        })
      );
      done();
    });
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
});
