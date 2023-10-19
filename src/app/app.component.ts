import { Component, OnInit } from '@angular/core';
import { CategoryService } from './aws.services/category.aws.service';
import { combineLatest, delay } from 'rxjs';
import { MemberService } from './aws.services/member.aws.service';
import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  DBloaded: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private memberService: MemberService
  ) { }
  ngOnInit(): void {
    combineLatest([this.categoryService.categories$.pipe(delay(environment.spinner_tempo)), this.memberService.members$])
      .subscribe(([categories, members]) => {
        if (categories.length > 0 && members.length > 0) {
          this.DBloaded = true;
        }
      });
  }

  title = 'bcsto';
}
