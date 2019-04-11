import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { tap, delay } from 'rxjs/operators';

import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API = `${environment.API}/cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API).pipe(delay(2000));
  }
}
