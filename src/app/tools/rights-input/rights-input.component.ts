import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'src/app/environments/environment';

interface RightsElement { [key: string]: boolean }


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
  credential: string = '';
  rights: RightsElement = {};
  disabled = false;

  onChange!: (value: RightsElement) => void;
  onTouch!: () => void;


  ngOnInit(): void {
  }

  writeValue(obj: RightsElement): void {
    if (obj === undefined || obj === null) {
      return;
    }
    this.rights = obj;
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
    // console.log('getRight of %s = ', right, this.rights[right]);
    return this.rights[right];
  }

  toggle(right: string): void {
    if (this.disabled) {
      return;
    }
    this.rights[right] = !this.rights[right];
    this.onChange(this.rights);
    this.onTouch();
  }

  clearRights(): void {
    const keys = Object.keys(this.rights);
    keys.forEach((key) => {
      this.rights[key] = false;
    });
  }


}
