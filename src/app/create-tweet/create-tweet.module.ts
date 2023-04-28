import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTweetComponent } from './create-tweet.component';

@NgModule({
  declarations: [CreateTweetComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CreateTweetComponent],
})
export class CreateTweetModule {}
