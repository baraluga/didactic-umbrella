import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetBarComponent } from './tweet-bar.component';



@NgModule({
  declarations: [
    TweetBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TweetBarComponent
  ]
})
export class TweetBarModule { }
