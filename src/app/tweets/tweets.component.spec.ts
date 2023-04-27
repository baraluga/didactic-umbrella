import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';
import { TweetManagerService } from '../services';
import { TweetsComponent } from './tweets.component';
import { TweetsModule } from './tweets.module';

const mockManager = () =>
  ({
    tweets$: of([
      { message: 'manam', id: '1st' },
      { message: 'love it', id: '2nd' },
    ]),
    delete: () => ({}),
  } as unknown as TweetManagerService);

describe('TweetsComponent', () => {
  const create = createComponentFactory({
    component: TweetsComponent,
    imports: [TweetsModule],
    providers: [{ provide: TweetManagerService, useFactory: mockManager }],
    declareComponent: false,
  });
  let spec: Spectator<TweetsComponent>;

  beforeEach(() => {
    spec = create();
    spec.detectChanges();
  });

  it('should show a list', () => {
    expect(spec.query('ul[data-test="tweets"]')).toExist();
  });

  it('should show the tweets from service', () => {
    const elIce = spec.queryAll('li');
    expect(elIce).toHaveLength(2);
    expect(elIce[1]).toHaveText('love it');
  });

  it('should show the delete tweet button for every tweet items', () => {
    expect(spec.queryAll('button[data-test="removeTweet"]')).toHaveLength(2);
  });

  it('should delegate the deletion of a tweet on click of delete of a specific tweet', () => {
    const deleteSpy = spyOn(spec.inject(TweetManagerService), 'delete');
    spec.click('[data-test2="remove-2nd"]');
    expect(deleteSpy).toHaveBeenCalledWith('2nd');
  });
});
