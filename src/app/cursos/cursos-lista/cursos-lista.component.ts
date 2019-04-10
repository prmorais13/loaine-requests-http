import { Component, OnInit } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CursosService } from '../cursos.service';
import { Curso } from 'src/app/models/curso';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModelRef: BsModalRef;

  constructor(
    private cursoService: CursosService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    // this.cursoService.list().subscribe(dados => (this.cursos = dados));
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursoService.list().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.bsModelRef = this.modalService.show(AlertModalComponent);
    this.bsModelRef.content.tipo = 'danger';
    this.bsModelRef.content.mensagem =
      'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
