import { Component, OnInit } from '@angular/core';
import { Storage } from 'aws-amplify/lib-esm';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  ngOnInit(): void {
    this.getFiles();
  }

  fileList: string[] = [];
  // filesystem !: { files: any[]; folders: Set<unknown>; };
  filesystem !: { [x: string]: any[]; };
  filename: string = '';
  file!: File;

  keysGetter = Object.keys;
  // valuesGetter(key: any) {
  //   return Object[key];
  // }


  getFiles() {
    Storage.list('', { pageSize: 'ALL' }) // for listing ALL files without prefix, pass '' instead
      .then(({ results }) => {
        this.fileList = results.map((file: any) => file.key);
        // this.filesystem = this.processStorageListFlat({ results });

        this.filesystem = this.processStorageListHierarchically({ results });

        console.log('filesystemH : ', this.filesystem);
        const folders = Object.keys(this.filesystem);
        folders.forEach((folder) => {
          const values = Object.entries(this.filesystem).map(([key, value]) => `${key}: ${value}`)
          console.log('values : ', values);
        });
        // folders.forEach((folder) => {
        //   console.log('folder : ', folder);
        //   console.log('files : ', this.filesystem[folder as keyof typeof this.filesystem]);
        // });

      })


      .catch((err) => console.log(err));
  }


  processStorageListFlat(response: { results: any; }) {
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

  processStorageListHierarchically(response: { results: any; }) {
    const filesystem = {};
    // https://stackoverflow.com/questions/44759750/how-can-i-create-a-nested-object-representation-of-a-folder-structure

    const add = (source: string, target: { [x: string]: any; }, item: any) => {
      const elements = source.split('/');
      const element = elements.shift();
      if (!element) return; // blank
      target[element] = target[element] || { __data: item }; // element;
      if (elements.length) {
        target[element] =
          typeof target[element] === 'object' ? target[element] : {};
        add(elements.join('/'), target[element], item);
      }
    };

    response.results.forEach((item: { key: any; }) => add(item.key, filesystem, item));
    return filesystem;
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



}
