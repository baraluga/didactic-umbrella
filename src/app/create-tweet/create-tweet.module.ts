import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTweetComponent } from './create-tweet.component';

@NgModule({
  declarations: [CreateTweetComponent],
  imports: [CommonModule, FormsModule],
  exports: [CreateTweetComponent],
})
export class CreateTweetModule {}
