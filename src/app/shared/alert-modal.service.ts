import { Injectable } from '@angular/core';

import { AlertModalComponent } from './alert-modal/alert-modal.component';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(
    mensagem: string,
    tipo: AlertTypes,
    dismissTimeout?: number
  ) {
    const bsModelRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModelRef.content.tipo = tipo;
    bsModelRef.content.mensagem = mensagem;

    if (dismissTimeout) {
      setTimeout(() => bsModelRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(mensagem: string) {
    this.showAlert(mensagem, AlertTypes.DANGER, 3000);
  }

  showAlertSuccess(mensagem: string) {
    this.showAlert(mensagem, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string) {
    const bsModelRef: BsModalRef = this.modalService.show(
      ConfirmModalComponent
    );
    bsModelRef.content.title = title;
    bsModelRef.content.msg = msg;

    if (okTxt) {
      bsModelRef.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      bsModelRef.content.cancelTxt = cancelTxt;
    }

    return (bsModelRef.content as ConfirmModalComponent).confirmResult;
  }
}
