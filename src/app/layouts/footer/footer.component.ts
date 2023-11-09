import { Component } from '@angular/core';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { environment } from 'src/app/environments/environment';
import { Menu } from 'src/app/interfaces/navigation.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private pageService: PageService
  ) { }
  contactMenu: Menu = this.pageService.getMandatoryItem('Contact');
  legalMenu: Menu = this.pageService.getMandatoryItem('Legal');



  release: string = environment.version;
}
