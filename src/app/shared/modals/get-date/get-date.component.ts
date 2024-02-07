import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/API.service';

@Component({
  selector: 'app-get-date',
  templateUrl: './get-date.component.html',
  styleUrls: ['./get-date.component.scss']
})
export class GetDateComponent implements OnInit {
  @Input() article!: Article;
  date !: string;
  withDate !: boolean;
  constructor(
    public activeModal: NgbActiveModal,

  ) { }
  ngOnInit(): void {
    // console.log('GetDateComponent', this.article);
    this.date = this.article.date ?? '';
    this.withDate = this.article.date ? true : false;

  }


  dateChanged() {
    // console.log('GetDateComponent : dateChanged', this.date);
    this.article.date = this.withDate ? this.date : '';
    this.activeModal.close(this.article);
  }

}
