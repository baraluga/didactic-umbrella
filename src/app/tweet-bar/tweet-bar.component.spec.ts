import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetBarComponent } from './tweet-bar.component';

describe('TweetBarComponent', () => {
  let component: TweetBarComponent;
  let fixture: ComponentFixture<TweetBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
