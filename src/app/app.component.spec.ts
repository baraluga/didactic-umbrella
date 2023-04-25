import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const create = createComponentFactory({
    component: AppComponent,
    imports: [AppModule],
    declareComponent: false,
  });
  let spec: Spectator<AppComponent>;

  beforeEach(() => {
    spec = create();
  });

  it('should show createTweet component', () => {
    expect(spec.query('[data-test="createTweet"]')).toExist();
  });

  it('should show tweets component', () => {
    expect(spec.query('app-tweets')).toExist();
  });
});
