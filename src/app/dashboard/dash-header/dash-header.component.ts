import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent {

  @Input() title = 'toolkit';
  @Input() subtitle = 'admin';

}
