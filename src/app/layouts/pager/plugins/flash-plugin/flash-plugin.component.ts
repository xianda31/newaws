import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-flash-plugin',
  templateUrl: './flash-plugin.component.html',
  styleUrls: ['./flash-plugin.component.scss']
})
export class FlashPluginComponent {
  @Input() data!: any;
  @Input() solo!: boolean;
  showMore: boolean = false;


  getMonth(date: Date): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }

}
