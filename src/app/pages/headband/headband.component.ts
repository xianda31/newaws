import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headband',
  templateUrl: './headband.component.html',
  styleUrls: ['./headband.component.scss']
})
export class HeadbandComponent implements OnInit {
  subtitle: string[] = [''];

  ngOnInit(): void {
    this.subtitle = this.description.split('|');
  }
  @Input() title!: string;
  @Input() description!: string;

}
