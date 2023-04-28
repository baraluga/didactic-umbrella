import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

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

  it('should instantiate beautifully', () => {
    expect(spec.component).toBeTruthy();
  });
});
