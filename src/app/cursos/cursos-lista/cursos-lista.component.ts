import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  @ViewChild('deleteModal') deleteModal;
  deleteModalRef: BsModalRef;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado: Curso;

  constructor(
    private cursosService: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private routeActivated: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    // this.cursoService.list().subscribe(dados => (this.cursos = dados));
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list().pipe(
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

  onEdit(id: number | string) {
    // this.router.navigate(['cursos/editar', id]);
    this.router.navigate(['editar', id], { relativeTo: this.routeActivated });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;

    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm'
    });
  }

  onConfirmDelete() {
    this.cursosService.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.onRefresh();
        this.alertService.showAlertSuccess(
          `Curso ${this.cursoSelecionado.nome} removido!`
        );
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger(
          'Erro ao remover curso. Tente novamente mais tarde.'
        ),
          this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
