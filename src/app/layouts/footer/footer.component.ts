import { Component } from '@angular/core';
import { NavigationService } from 'src/app/aws.services/navigation.aws.service';
import { environment } from 'src/app/environments/environment';
import { MenuItem } from 'src/app/interfaces/navigation.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private navService: NavigationService
  ) { }
  contactMenu: MenuItem = this.navService.getMandatoryItem('Contact');
  legalMenu: MenuItem = this.navService.getMandatoryItem('Légal');



  release: string = environment.version;
}
