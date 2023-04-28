import { Router } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TweetBarComponent } from './tweet-bar.component';
import { TweetBarModule } from './tweet-bar.module';

describe('TweetBarComponent', () => {
  const create = createComponentFactory({
    component: TweetBarComponent,
    imports: [TweetBarModule],
    declareComponent: false,
  });
  let spec: Spectator<TweetBarComponent>;

  beforeEach(() => {
    spec = create();
  });

  it('should navigate to the home page on click of home link', () => {
    const navigate = spyOn(spec.inject(Router), 'navigate');
    spec.click('[data-test="home"]');
    expect(navigate).toHaveBeenCalledWith(['home']);
  });

  it('should navigate to the create tweet page on click of createTweet link', () => {
    const navigate = spyOn(spec.inject(Router), 'navigate');
    spec.click('[data-test="createTweet"]');
    expect(navigate).toHaveBeenCalledWith(['create']);
  });
});
