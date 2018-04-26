import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRequiredValidatorDirective } from './select-required-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectRequiredValidatorDirective
  ],
  exports: [
    SelectRequiredValidatorDirective
  ]
})
export class ValidatorModule { }
