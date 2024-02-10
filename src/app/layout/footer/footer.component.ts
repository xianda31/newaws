import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { environment } from 'src/environments/environment';
import { Menu } from 'src/app/interfaces/navigation.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  pages$: Observable<Page[]> = this.pageService.pages$;
  legalPage!: Page;
  contactPage!: Page;

  constructor(
    private pageService: PageService
  ) { }
  ngOnInit(): void {

    this.pages$.subscribe((pages) => {
      this.contactPage = pages.filter((page) => page.root_menu.toLocaleLowerCase().includes('contact'))[0] ?? null;
      this.legalPage = pages.filter((page) => page.root_menu.toLocaleLowerCase().includes('legal'))[0] ?? null;
    });

  }

  release: string = environment.version;
}
