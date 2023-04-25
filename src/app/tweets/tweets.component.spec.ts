import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TweetsComponent } from './tweets.component';
import { TweetsModule } from './tweets.module';

describe('TweetsComponent', () => {
  const create = createComponentFactory({
    component: TweetsComponent,
    imports: [TweetsModule],
    declareComponent: false,
  });
  let spec: Spectator<TweetsComponent>;

  beforeEach(() => {
    spec = create();
  });

  it('should be ok', () => {
    expect(spec).toBeTruthy();
  });
});
