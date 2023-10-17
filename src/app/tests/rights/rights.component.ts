import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rights',
  templateUrl: './rights.component.html',
  styleUrls: ['./rights.component.scss']
})
export class RightsComponent implements OnInit {
  credentials: string = 'Publisher Admin Sales'; //

  ngOnInit(): void {
  }


  onClick() {
    console.log('clicked', this.credentials);
  }


}
