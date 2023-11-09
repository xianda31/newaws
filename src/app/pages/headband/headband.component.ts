import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-headband',
  templateUrl: './headband.component.html',
  styleUrls: ['./headband.component.scss']
})
export class HeadbandComponent implements OnChanges {
  @Input() title!: string;
  // @Input() description!: string;
  subtitle: string[] = [''];
  header!: string;
  ngOnChanges(changes: SimpleChanges): void {
    this.subtitle = changes['title'].currentValue.split('|');
    this.header = this.subtitle.shift()!;
  }
}
