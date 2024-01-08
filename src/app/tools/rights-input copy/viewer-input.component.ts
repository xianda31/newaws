import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { pageViews } from 'src/app/dashboard/publications/pages/interfaces/page-interface';

interface ViewsArray { [key: string]: boolean }


@Component({
  selector: 'app-viewer-input',
  templateUrl: './viewer-input.component.html',
  styleUrls: ['./viewer-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ViewerInputComponent,
      multi: true
    }
  ]
})

export class ViewerInputComponent implements ControlValueAccessor {

  options = pageViews;
  selectedOption!: string;
  disabled = false;

  private onChange: (value: string) => void = () => { };
  onTouch: () => void = () => { };

  writeValue(value: string): void {
    // console.log('writeValue', value);
    if (value === undefined || value === null) {
      return;
    }
    this.selectedOption = value;
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

  onSelectionChanged(option: string) {
    // console.log('option changed', option);
    this.selectedOption = option;
    this.onChange(this.selectedOption);
    this.onTouch();
  }
}
