import { Component, OnInit } from '@angular/core';

import { UploadFileService } from '../upload-file.service';
import { environment } from '../../../environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progress = 0;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {}

  onChange(event: any) {
    console.log(event);

    const selectedFiles = event.srcElement.files as FileList;

    const fileNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
    this.progress = 0;
  }

  upload() {
    if (this.files && this.files.size > 0) {
      this.uploadService
        .upload(this.files, `${environment.BASE_URL}/upload`)
        .subscribe((event: HttpEvent<Object>) => {
          // HttpEventType
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload concluído!');
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            console.log('Progesso:', percentDone);
            this.progress = percentDone;
          }
        });
    }
  }
}
