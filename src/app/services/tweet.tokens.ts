import { Observable } from 'rxjs';
import { Tweet } from '../models';
import { InjectionToken } from '@angular/core';

export interface PersistenceClient {
  getAll(): Observable<Tweet[]>;
  create(message: string): Observable<Tweet>;
}

export const PERSISTENCE_CLIENT = new InjectionToken<PersistenceClient>(
  'persistence-client'
);
