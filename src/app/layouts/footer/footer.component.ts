import { Component } from '@angular/core';
import { NavigationService } from 'src/app/aws.services/navigation.aws.service';
import { environment } from 'src/app/environments/environment';
import { Menu } from 'src/app/interfaces/navigation.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private navService: NavigationService
  ) { }
  contactMenu: Menu = this.navService.getMandatoryItem('Contact');
  legalMenu: Menu = this.navService.getMandatoryItem('Légal');



  release: string = environment.version;
}
