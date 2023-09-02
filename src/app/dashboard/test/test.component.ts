import { Component, OnInit } from '@angular/core';
import { Storage } from 'aws-amplify/lib-esm';

// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#configure-your-application


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  fileList: string[] = [];
  filesystem !: { files: any[]; folders: Set<unknown>; };
  filename: string = '';
  file!: File;
  preview: string = '';
  loadedImg: string = '';

  constructor(
  ) { }
  ngOnInit(): void {


    // Storage.list('', { pageSize: 'ALL' }) // for listing ALL files without prefix, pass '' instead
    //   .then(({ results }) => {

    //     // console.log(results);
    //     this.fileList = results.map((file: any) => file.key);
    //     console.log('fileList : ', this.fileList);

    //     this.filesystem = this.processStorageList({ results });
    //     console.log('filesystem : ', this.filesystem);
    //   })
    //   .catch((err) => console.log(err));

    this.getFiles();

  }

  getFiles() {
    Storage.list('', { pageSize: 'ALL' }) // for listing ALL files without prefix, pass '' instead
      .then(({ results }) => {
        this.fileList = results.map((file: any) => file.key);
        this.filesystem = this.processStorageList({ results });
      })
      .catch((err) => console.log(err));
  }

  async onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.filename = this.file.name;
      this.preview = await this.getImage64(this.file);
    }
  }

  getImage64(file: File): Promise<string> {
    var promise: Promise<string> = new Promise((resolve: (arg0: string) => void) => {
      var image64 = '';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        image64 = e.target.result;
        resolve(image64);
      };
      reader.readAsDataURL(file);
    });
    return promise;
  }


  upload() {
    this._upload(this.file);
  }
  async _upload(file: File) {
    try {
      const result = await Storage.put('folder1/' + file.name, file, {
        contentType: "image/png", // contentType is optional
        level: 'public'
      });
      console.log("Successfully uploaded file: ", result);
      this.getFiles();
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }


  async download(filename: string) {
    try {
      const result = await Storage.get(filename, { level: 'public' });
      console.log("Successfully downloaded file: ", result);
      this.loadedImg = result as string;

    } catch (error) {
      console.log("Error downloading file: ", error);
    }
  }


  processStorageList(response: { results: any; }) {
    let files: any[] = [];
    let folders = new Set();
    response.results.forEach((res: { size: any; key: unknown; }) => {
      if (res.size) {
        files.push(res);
        // sometimes files declare a folder with a / within then
        let possibleFolder = res.key! as string;
        possibleFolder = possibleFolder
          .split('/')
          .slice(0, -1)
          .join('/');
        if (possibleFolder) folders.add(possibleFolder);
      } else {
        folders.add(res.key);
      }
    });
    return { files, folders };
  }
}
