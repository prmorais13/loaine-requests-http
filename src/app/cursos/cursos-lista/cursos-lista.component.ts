import { Component, OnInit } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from './../../shared/alert-modal.service';

import { CursosService } from '../cursos.service';
import { Curso } from 'src/app/models/curso';
// import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];
  // bsModelRef: BsModalRef;
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private cursoService: CursosService,
    private alertService: AlertModalService // private modalService: BsModalService
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
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
    // this.bsModelRef = this.modalService.show(AlertModalComponent);
    // this.bsModelRef.content.tipo = 'danger';
    // this.bsModelRef.content.mensagem =
    //   'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
