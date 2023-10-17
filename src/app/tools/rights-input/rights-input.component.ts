import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'src/app/environments/environment';

interface RightsArray { [key: string]: boolean }


@Component({
  selector: 'app-rights-input',
  templateUrl: './rights-input.component.html',
  styleUrls: ['./rights-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RightsInputComponent,
      multi: true
    }
  ]
})

export class RightsInputComponent implements OnInit, ControlValueAccessor {

  env_rights = environment.rights;
  credentials: string = '';
  rights: RightsArray = {};
  disabled = false;

  onChange!: (value: string) => void;
  onTouch!: () => void;


  ngOnInit(): void {
  }

  writeValue(obj: string): void {
    if (obj === undefined || obj === null) {
      return;
    }
    this.credentials = obj;
    this.rights = this.readRights(this.credentials);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getRight(right: string): boolean {
    return this.rights[right];
  }

  toggle(right: string): void {
    if (this.disabled) {
      return;
    }
    this.rights[right] = !this.rights[right];
    this.onChange(this.genCredentials(this.rights));
    this.onTouch();
  }

  readRights(credentials: string): RightsArray {
    const rightsDef = environment.rights;
    let rights: any = {};
    rightsDef.forEach((right) => {
      rights[right] = credentials.includes(right);
    });
    return rights;
  }

  genCredentials(rights: any): string {
    const rightsDef = environment.rights;
    let credentials = '';
    rightsDef.forEach((right) => {
      if (rights[right]) {
        credentials += (right + ' ');
      }
    });
    return credentials;
  }
}
