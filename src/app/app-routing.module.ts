import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTweetComponent } from './create-tweet/create-tweet.component';
import { TweetsResolver } from './routing/tweets.resolver';
import { TweetsComponent } from './tweets/tweets.component';

const routes: Routes = [
  {
    component: TweetsComponent,
    path: 'home',
    resolve: [TweetsResolver],
  },
  { component: CreateTweetComponent, path: 'create' },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
