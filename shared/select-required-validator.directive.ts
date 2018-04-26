import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appSelectRequiredValidator]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredValidatorDirective,
    multi: true
  }]
})
export class SelectRequiredValidatorDirective implements Validator {
  //@Input('appSelectRequiredValidator') defaultValue: string;
  validate(control: AbstractControl) : { [key: string]:any } | null {
    return control.value === '-1' ? { 'defaultSelected' : true } : null;
  }
  constructor() { } 

}
