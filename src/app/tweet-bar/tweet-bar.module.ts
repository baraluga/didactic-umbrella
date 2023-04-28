import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TweetBarComponent } from './tweet-bar.component';

@NgModule({
  declarations: [TweetBarComponent],
  imports: [CommonModule, RouterModule],
  exports: [TweetBarComponent],
})
export class TweetBarModule {}
