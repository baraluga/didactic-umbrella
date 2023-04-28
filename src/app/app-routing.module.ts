import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetsComponent } from './tweets/tweets.component';
import { CreateTweetComponent } from './create-tweet/create-tweet.component';

const routes: Routes = [
  {
    component: TweetsComponent,
    path: 'home',
  },
  { component: CreateTweetComponent, path: 'create' },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
