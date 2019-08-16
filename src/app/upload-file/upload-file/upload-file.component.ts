import { Component, OnInit } from '@angular/core'

import { UploadFileService } from '../upload-file.service'
import { environment } from '../../../environments/environment'
/// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { uploadProgress, filterResponse } from '../../shared/rxjs-operators'

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  preserveWhitespaces: true
})
export class UploadFileComponent implements OnInit {
  files: Set<File>
  progress = 0

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {}

  onChange(event: any) {
    console.log(event)

    const selectedFiles = event.srcElement.files as FileList

    const fileNames = []
    this.files = new Set()

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name)
      this.files.add(selectedFiles[i])
    }

    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ')
    this.progress = 0
  }

  upload() {
    if (this.files && this.files.size > 0) {
      this.uploadService
        .upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress(progress => {
            console.log(progress)
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload concluído!'))
      // .subscribe((event: HttpEvent<Object>) => {
      //   // console.log(event);
      //   if (event.type === HttpEventType.Response) {
      //     console.log('Upload concluído!');
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round((event.loaded * 100) / event.total);
      //     console.log('Progesso:', percentDone);
      //     this.progress = percentDone;
      //   }
      // });
    }
  }

  onDownloadExcel() {
    this.uploadService
      .download(`${environment.BASE_URL}/downloadExcel`)
      .subscribe((res: any) => {
        this.handleFile(res, 'report.xlsx')
      })
  }

  onDownloadPDF() {
    this.uploadService
      .download(`${environment.BASE_URL}/downloadPDF`)
      .subscribe((res: any) => {
        this.handleFile(res, 'report.pdf')
      })
  }

  handleFile(res: any, fileName: string) {
    const file = new Blob([res], { type: res.type })

    // Para download no IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, 'Teste.pdf')
      return
    }

    const blob = window.URL.createObjectURL(file)

    const link = document.createElement('a')
    link.href = blob
    link.download = fileName
    // link.click();
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    )

    // Para firefox
    setTimeout(() => {
      window.URL.revokeObjectURL(blob)
      link.remove()
    }, 100)
  }
}
