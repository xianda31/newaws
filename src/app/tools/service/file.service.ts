import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from 'aws-amplify/lib-esm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  loadBucket(): Observable<any> {
    return new Observable((observer) => {
      Storage.list('', { level: 'public', pageSize: 'ALL' }) // for listing ALL files without prefix, pass '' instead
        .then((res) => {
          observer.next(res.results);
        })
        .catch((err) => observer.error(err));
    });
  };

  // https://docs.amplify.aws/lib/storage/list/q/platform/js/#public-level-list
  processStorageList(results: any, root: string) {
    const filesystem = {};

    const add = (level: number, key: string, target: { [x: string]: any; }, item: any) => {
      const source = key.replace(root, '');
      const elements = source.split('/');
      const element = elements.shift();
      if (!element) return; // blank  

      target[element] = target[element] || { __data: item }; // element
      target[element].__isFile = false;   // à priori
      if (elements.length) {
        target[element] = typeof target[element] === 'object' ? target[element] : {};
        add(level + 1, elements.join('/'), target[element], item);
      } else {
        target[element].__isFile = true;
      }
    };

    results.forEach((item: any) => {
      add(0, item.key, filesystem, item)
    });

    return filesystem;
  }

  uploadFile(file: any, key: string, overwrite: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.put(key, file, {
        level: 'public',
        contentType: file.type,
        progressCallback(progress: any) {
          // console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
        // metadata: {
        //   album: 'happy'
        // }
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

}
