import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TweetsComponent } from './tweets.component';
import { TweetsModule } from './tweets.module';
import { TweetManagerService } from '../services';

describe('TweetsComponent', () => {
  const create = createComponentFactory({
    component: TweetsComponent,
    imports: [TweetsModule],
    declareComponent: false,
  });
  let spec: Spectator<TweetsComponent>;

  beforeEach(() => {
    spec = create({ detectChanges: false });
  });

  it('should show a list', () => {
    expect(spec.query('ul[data-test="tweets"]')).toExist();
  });

  it('should show the tweets from service', () => {
    spyOn(spec.inject(TweetManagerService), 'getTweets').and.returnValue([
      'manam',
      'love it',
    ]);
    spec.detectChanges();
    const elIce = spec.queryAll('li');
    expect(elIce).toHaveLength(2);
    expect(elIce[1]).toHaveText('love it');
  });
});
