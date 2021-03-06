import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AlertModalService } from './../../shared/alert-modal.service';

import { CursosService } from '../cursos.service';
import { map, switchMap } from 'rxjs/operators';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  preserveWhitespaces: true
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cursosService: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private activatedRouter: ActivatedRoute // private router: Router
  ) {}

  ngOnInit() {
    const { id, nome } = this.activatedRouter.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [id],
      nome: [
        nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ]
    });

    // this.activatedRouter.params.subscribe((params: any) => {
    //   const id = params['id'];
    //   console.log(id);
    //   const curso$ = this.cursosService.loadById(id).subscribe(curso => {
    //     this.updateForm(curso);
    //   });
    // });

    // this.activatedRouter.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.cursosService.loadById(id))
    //   )
    //   .subscribe(curso => this.updateForm(curso));
  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');

      let msgSuccess = 'Curso criado com sucesso.';
      let msgError = 'Erro ao criar curso. Tente novamente mais tarde.';
      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso.';
        msgError = 'Erro ao atualizar curso. Tente novamente mais tarde.';
      }

      this.cursosService.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => {
          this.modal.showAlertDanger(msgError);
        }
      );

      // if (this.form.value.id) {
      //   // Update
      //   this.cursosService.update(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Curso atualizado com sucesso.');
      //       this.location.back();
      //       // this.router.navigate(['/cursos']);
      //     },
      //     error =>
      //       this.modal.showAlertDanger(
      //         'Erro ao atualizar curso. Tente novamente mais tarde.'
      //       ),
      //     () => console.log('Update completo.')
      //   );
      // } else {
      //   // Create
      //   this.cursosService.create(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Curso criado com sucesso.');
      //       this.location.back();
      //       // this.router.navigate(['/cursos']);
      //     },
      //     error =>
      //       this.modal.showAlertDanger(
      //         'Erro ao criar curso. Tente novamente mais tarde.'
      //       ),
      //     () => console.log('Request completo.')
      //   );
      // }
    }
  }

  hasError(campo: string) {
    return this.form.get(campo).errors;
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    // console.log('Cancel');
  }
}
