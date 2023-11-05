import { Component, OnInit } from '@angular/core';
import { CategoryService } from './aws.services/category.aws.service';
import { combineLatest, delay } from 'rxjs';
import { MemberService } from './aws.services/member.aws.service';
import { environment } from './environments/environment';
import { NavigationService } from './aws.services/navigation.aws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  DBloaded: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private memberService: MemberService,
    private navService: NavigationService
  ) { }
  ngOnInit(): void {


    combineLatest([this.categoryService.categories$.pipe(delay(environment.spinner_tempo)),
    this.memberService.members$,
    this.navService.siteMenus$])
      .subscribe(([categories, members, siteMenus]) => {
        if (categories.length > 0 && members.length > 0 && siteMenus.length > 0) {
          this.DBloaded = true;
        }
      });
  }

  title = 'bcsto';
}
