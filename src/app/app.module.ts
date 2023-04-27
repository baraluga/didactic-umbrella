import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTweetModule } from './create-tweet/create-tweet.module';
import { TweetsModule } from './tweets/tweets.module';
import { PERSISTENCE_CLIENT } from './services/tweet.tokens';
import { TweetClient } from './services';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CreateTweetModule,
    TweetsModule,
    HttpClientModule,
  ],
  providers: [{ provide: PERSISTENCE_CLIENT, useClass: TweetClient }],
  bootstrap: [AppComponent],
})
export class AppModule {}
