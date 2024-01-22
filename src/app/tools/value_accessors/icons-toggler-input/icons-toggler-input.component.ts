import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

interface IconsArray { [key: string]: string }

@Component({
  selector: 'app-icons-toggler-input',
  templateUrl: './icons-toggler-input.component.html',
  styleUrls: ['./icons-toggler-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IconsTogglerInputComponent,
      multi: true
    }
  ]
})
export class IconsTogglerInputComponent {
  @Input() options!: IconsArray;
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
