import { Component, OnInit } from '@angular/core';
import { CategoryService } from './aws.services/category.aws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log('AppComponent ngOnInit');
  }



  title = 'bcsto';
}
