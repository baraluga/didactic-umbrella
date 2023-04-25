import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent } from './tweets.component';

@NgModule({
  declarations: [TweetsComponent],
  imports: [CommonModule],
  exports: [TweetsComponent],
})
export class TweetsModule {}
