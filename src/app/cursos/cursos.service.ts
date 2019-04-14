import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { tap, delay, take } from 'rxjs/operators';

import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API = `${environment.API}/cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API).pipe(delay(1000));
  }

  loadById(id: number | string) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso: Curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private update(curso: Curso) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: Curso) {
    if (curso.id) {
      return this.update(curso);
    }

    return this.create(curso);
  }

  remove(id: number | string) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
