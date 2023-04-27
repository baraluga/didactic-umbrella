import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTweetModule } from './create-tweet/create-tweet.module';
import { TweetsModule } from './tweets/tweets.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CreateTweetModule,
    TweetsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
