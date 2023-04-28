import 'zone.js/testing';
// keep on top
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { defineGlobalsInjections } from '@ngneat/spectator';
import { TweetClient } from './app/services';
import { PERSISTENCE_CLIENT } from './app/services/tweet.tokens';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};

defineGlobalsInjections({
  imports: [HttpClientTestingModule, RouterTestingModule],
  providers: [{ provide: PERSISTENCE_CLIENT, useClass: TweetClient }],
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().forEach(context);
