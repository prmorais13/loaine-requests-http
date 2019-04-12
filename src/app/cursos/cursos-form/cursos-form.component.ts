import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { AlertModalService } from './../../shared/alert-modal.service';

import { CursosService } from '../cursos.service';
import { Router } from '@angular/router';

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
    private cursosService: CursosService,
    private modal: AlertModalService,
    private location: Location // private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.cursosService.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Curso criado com sucesso.');
          this.location.back();
          // this.router.navigate(['/cursos']);
        },
        error =>
          this.modal.showAlertDanger(
            'Erro ao criar curso. Tente novamente mais tarde.'
          ),
        () => console.log('Request completo.')
      );
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
