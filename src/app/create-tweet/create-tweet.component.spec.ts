import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTweetComponent } from './create-tweet.component';

describe('CreateTweetComponent', () => {
  let component: CreateTweetComponent;
  let fixture: ComponentFixture<CreateTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTweetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show an input for tweet', () => {
    const compiled = TestBed.createComponent(CreateTweetComponent)
      .nativeElement as HTMLElement;
    const inputElement = compiled.querySelector('input[data-test="tweet"]');
    expect(inputElement).toBeTruthy();
  });
});
