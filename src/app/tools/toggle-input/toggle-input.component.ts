import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ToggleInputComponent,
      multi: true
    }
  ]
})

export class ToggleInputComponent implements OnInit, ControlValueAccessor {


  value = false;
  disabled = false;
  onChange!: (value: boolean) => void;
  onTouch!: () => void;


  ngOnInit(): void {
  }
  writeValue(obj: boolean): void {
    this.value = obj;
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
  toggle(): void {
    if (this.disabled) {
      return;
    }
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouch();
  }

}
