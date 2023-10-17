import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rights',
  templateUrl: './rights.component.html',
  styleUrls: ['./rights.component.scss']
})
export class RightsComponent implements OnInit {
  credentials: string = 'Publisher Admin Sales'; //
  rights !: boolean[];

  ngOnInit(): void {
    this.rights = this.readRights(this.credentials);
    // console.log(this.rights);
  }


  onClick() {
    this.credentials = this.genCredentials(this.rights);
    console.log('clicked', this.credentials);
  }

  readRights(credentials: string): boolean[] {
    const rightsDef = environment.rights;
    let rights: any = {};
    rightsDef.forEach((right) => {
      rights[right] = credentials.includes(right);
    });
    return rights;
  }

  genCredentials(rights: any): string {
    const rightsDef = environment.rights;
    let credentials = '';
    rightsDef.forEach((right) => {
      if (rights[right]) {
        credentials += (right + ' ');
      }
    });
    console.log(rights, credentials);
    return credentials;
  }

}
