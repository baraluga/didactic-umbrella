import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet-bar',
  templateUrl: './tweet-bar.component.html',
  styleUrls: ['./tweet-bar.component.scss'],
})
export class TweetBarComponent {
  constructor(private readonly router: Router) {}

  onHomeClick(): void {
    this.router.navigate(['home']);
  }

  onCreateClick(): void {
    this.router.navigate(['create']);
  }
}
