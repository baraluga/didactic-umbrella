import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TweetManagerService } from './tweet-manager.service';

describe('TweetManagerService', () => {
  const TEST_MESSAGE = 'hello';
  const create = createServiceFactory({ service: TweetManagerService });
  let spec: SpectatorService<TweetManagerService>;

  beforeEach(() => {
    spec = create();
    spec.service.addTweet(TEST_MESSAGE);
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

  it('should provide a way to remove a tweet with the matching ID', () => {
    const tweets = spec.service.getListOfTweets();
    expect(tweets.length).toEqual(1);
    const testId = tweets.find((tweet) => tweet.message === TEST_MESSAGE)?.id;
    spec.service.delete(testId as string);
    expect(spec.service.getListOfTweets()).not.toContain(
      jasmine.objectContaining({
        message: TEST_MESSAGE,
      })
    );
  });
});
