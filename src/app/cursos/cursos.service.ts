import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API).pipe(tap(console.log));
  }
}
