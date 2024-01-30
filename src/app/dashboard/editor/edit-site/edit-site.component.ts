import { Component } from '@angular/core';
import { Page } from 'src/app/API.service';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent {
  selected_menu: string = '';
  selected_page!: Page | null;

  select_menu(menu: string): void {
    this.selected_menu = menu;
    this.selected_page = null;
  }

}
