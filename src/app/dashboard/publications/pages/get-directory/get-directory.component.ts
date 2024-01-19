import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/API.service';

@Component({
  selector: 'app-get-directory',
  templateUrl: './get-directory.component.html',
  styleUrls: ['./get-directory.component.scss']
})
export class GetDirectoryComponent implements OnInit {
  @Input() article!: Article;

  dirForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    // console.log('GetDirectoryComponent', this.article);
    this.dirForm = new FormGroup({
      directory: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

  }


  onSubmit() {
    // console.log('GetDirectoryComponent : directoryChanged', this.directory);
    this.article.directory = this.dirForm.value.directory;
    this.activeModal.close(this.article);
  }

}
