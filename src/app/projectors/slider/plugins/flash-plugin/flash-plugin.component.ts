import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-flash-plugin',
  templateUrl: './flash-plugin.component.html',
  styleUrls: ['./flash-plugin.component.scss']
})
export class FlashPluginComponent {
  @Input() data!: any;
  showMore: boolean = false;

}
