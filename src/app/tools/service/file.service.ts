import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from 'aws-amplify/lib-esm';
import { Observable, BehaviorSubject } from 'rxjs';
import { FolderItem } from 'src/app/interfaces/files.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private publicBucket: any;
  bucketLoaded$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadBucket().subscribe((res) => {
      this.publicBucket = res;
      // console.log('publicBucket loaded');
      this.bucketLoaded$.next(true);
    }
    );

  }

  get bucketLoaded(): Observable<boolean> {
    return this.bucketLoaded$.asObservable();
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


  getFileURL(key: string) {
    return Storage.get(key, { level: 'public', validateObjectExistence: true });
  }



  createDirectory(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.put(key, '', {
        level: 'public',
        contentType: 'text/plain',
      })
        .then((result) => {
          this.publicBucket.push({ key: key, lastModified: Date.now(), size: 0, __isFile: false });

          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }


  uploadFile(key: string, file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.put(key, file, {
        level: 'public',
        contentType: file.type,
        progressCallback(progress: any) {
          // console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      })
        .then((result) => {
          this.publicBucket.push({ key: key, lastModified: Date.now(), size: file.size, __isFile: true });
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteFile(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.remove(key, { level: 'public' })
        .then((result) => {
          this.publicBucket.splice(this.publicBucket.findIndex((file: any) => file.key === (key)), 1);

          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // utilities




  // emulation réperoires et fichiers

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

  genFolderItems(folder_path: string): FolderItem[] {
    const bucket: any[] = [];
    this.publicBucket.forEach((item: any) => {
      if (item.key.startsWith(folder_path)) { bucket.push(item); }
    });

    const fitems = this.processStorageList(bucket, folder_path) as any;

    let folderItems: FolderItem[] = [];
    const keys = Object.keys(fitems);

    // d'abord les répertoires
    keys.forEach((key: any) => {
      if (!fitems[key].__isFile) {
        folderItems.push({ key: key, lastModified: fitems[key].lastModified, size: fitems[key].__data.size, __isFile: fitems[key].__isFile });
      }
    });
    // puis les fichiers
    keys.forEach((key: any) => {
      if (fitems[key].__isFile) {
        folderItems.push({ key: key, lastModified: fitems[key].lastModified, size: fitems[key].__data.size, __isFile: fitems[key].__isFile });
      }
    });

    return folderItems;
  }
}
