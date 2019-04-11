import { Injectable } from '@angular/core';

import { AlertModalComponent } from './alert-modal/alert-modal.component';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(mensagem: string, tipo: AlertTypes) {
    const bsModelRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModelRef.content.tipo = tipo;
    bsModelRef.content.mensagem = mensagem;
  }

  showAlertDanger(mensagem: string) {
    this.showAlert(mensagem, AlertTypes.DANGER);
  }

  showAlertSuccess(mensagem: string) {
    this.showAlert(mensagem, AlertTypes.SUCCESS);
  }
}
